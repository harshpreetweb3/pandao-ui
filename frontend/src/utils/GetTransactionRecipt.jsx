import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';

// Define internal functions 
function FeePaid({ xrdSpent }) {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4 flex flex-col items-center">
            <span className="font-semibold text-gray-700 mr-2">XrdPaid:</span>
            <span className="text-red-600 font-bold">{`-${xrdSpent}`}</span>
        </div>
    );
}

function ReceiptComponentAccount({ entityArrayAccount }) {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4 flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Changes in your Account</h1>
            <ol className="space-y-4">
                {entityArrayAccount.map((entity, index) => (
                    <li key={index} className="flex flex-row items-center space-x-4">
                        <img className="w-10 h-10 rounded-full" src={entity.entityUrl} alt={entity.entityName} />
                        <span className="font-medium text-gray-700">{entity.entityName}</span>
                        <span className={`${entity.balanceChange > 0 ? 'text-green-600': 'text-red-700'} font-bold`}>{entity.balanceChange > 0 ? `+ ${entity.balanceChange}`:`- ${entity.balanceChange}` }</span>
                    </li>
                ))}
            </ol>
        </div>
    );
}

function ReceiptComponent({ entityArrayComponent }) {
    return (
        <div className="p-4 bg-white shadow-md rounded-lg mt-4 flex flex-col items-center">
            <h1 className="text-xl font-semibold text-gray-800 mb-2">Changes in Component</h1>
            <ul className="space-y-4">
                {entityArrayComponent.map((entity, index) => (
                    <li key={index} className="flex flex-row items-center space-x-4">
                        <img className="w-10 h-10 rounded-full" src={entity.entityUrl} alt={entity.entityName} />
                        <span className="font-medium text-gray-700">{entity.entityName}</span>
                        <span className={`${entity.balanceChange > 0 ? 'text-green-600': 'text-red-700'} font-bold`}>{entity.balanceChange > 0 ? `+ ${entity.balanceChange}`:`- ${entity.balanceChange}` }</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

async function getEntityMetadata(entity) {
    let name;
    let description;
    let iconUrl;

    try {
        let reqBody = {
            "addresses": [entity],
            "aggregation_level": "Vault",
            "opt_ins": {
                "ancestor_identities": true,
                "component_royalty_config": true,
                "component_royalty_vault_balance": true,
                "package_royalty_vault_balance": true,
                "non_fungible_include_nfids": true,
                "explicit_metadata": [
                    "name",
                    "icon_url",
                    "description"
                ]
            }
        };

        const response = await axios.post('https://stokenet.radixdlt.com/state/entity/details', reqBody);
        const results = response.data;
        results.items[0].explicit_metadata.items.forEach((data) => {
            if (data.key === 'name') {
                name = data.value.typed.value;
            } else if (data.key === 'icon_url') {
                iconUrl = data.value.typed.value;
            } else if (data.key === 'description') {
                description = data.value.typed.value;
            }
        });

        return {
            name: name,
            iconUrl: iconUrl,
            description: description
        };
    } catch (error) {
        console.error('Error getting entity detail:', error);
        return null;
    }
}

async function extractTransactionsData(txId) {
    const accountRegex = /^account/i;
    const componentRegex = /^component/i;
    const entityArrayAccount = [];
    const entityArrayComponent = [];

    let body = {
        "intent_hash": txId,
        "opt_ins": {
            "affected_global_entities": true,
            "balance_changes": true
        }
    };

    try {
        const response = await axios.post('https://babylon-stokenet-gateway.radixdlt.com/transaction/committed-details', body);
        const results = await response.data;
        const entitiesEffected = results.transaction.affected_global_entities;
        const committedTime = results.transaction.confirmed_at;
        const xrdSpent = results.transaction.fee_paid;
        const TokenBalancesChanges = results.transaction.balance_changes.fungible_balance_changes;

        await Promise.all(TokenBalancesChanges.map(async (balance) => {
            if (accountRegex.test(balance.entity_address)) {
                const balanceChange = balance.balance_change;
                const changedEntityMetaData = await getEntityMetadata(balance.resource_address);
                entityArrayAccount.push({
                    balanceChange: balanceChange,
                    entityName: changedEntityMetaData.name,
                    entityUrl: changedEntityMetaData.iconUrl
                });
            }

            if (componentRegex.test(balance.entity_address)) {
                const balanceChange = balance.balance_change;
                const changedEntityMetaData = await getEntityMetadata(balance.resource_address);
                entityArrayComponent.push({
                    balanceChange: balanceChange,
                    entityName: changedEntityMetaData.name,
                    entityUrl: changedEntityMetaData.iconUrl
                });
            }
        }));

        const TransactionDetailsComponent = () => (
            <div className='w-1/2'>
                <span>{committedTime}</span>
                <FeePaid xrdSpent={xrdSpent} />
                <ReceiptComponentAccount entityArrayAccount={entityArrayAccount} />
                <ReceiptComponent entityArrayComponent={entityArrayComponent} />
            </div>
        );

        return TransactionDetailsComponent;
    } catch (error) {
        console.error('Error fetching transaction details:', error);
        return null;
    }
}

export default extractTransactionsData;