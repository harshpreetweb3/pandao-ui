import axios from "axios";

// define internals functions 

async function getEntityMetadata(entity) {
    var name
    var description
    var iconurl
    let reqBody = {
        addresses: [
            entity
        ],
        aggregation_level: "Vault",
        opt_ins: {
            "explicit_metadata": [
                "name",
                "description",
                "icon_url"
            ]
        }
    }
    try {
        const response = await axios.post('https://stokenet.radixdlt.com/state/entity/details', reqBody)
        const results = await response.data;
        console.log(results)
        const metaData = results.items[0].explicit_metadata.items.map((data) => {
            if (data.key === 'name') {
                name = data.value.fields.value
                console.log(name)
            }
            if (data.key === 'icon_url') {
                iconurl = data.value.fields.value
                console.log(iconurl)
            }
            if (data.key === 'description') {
                description = data.value.fields.value
            }


        })
        return {
            name: name,
            iconurl: iconurl,
            description: description
        }
    }
    catch (error) {
        console.error('error getting entity detail:', error);
        return null;
    }
}
async function extractTransactionsData(txId) {

    const accountRegex = /^account/i
    const compnentRegex = /^component/i
    var entityArryAccount = []
    var entityArryComponent = []

    // get transcations data
    let body = {
        "intent_hash": txId,
        "opt_ins": {
            "affected_global_entities": true,
            "balance_changes": true
        }
    }
    try {
        const response = await axios.post('https://babylon-stokenet-gateway.radixdlt.com/transaction/committed-details', body);
        const results = await response.data;
        const entitiesEffected = results.transaction.affected_global_entities
        const commitedTime = results.transaction.confirmed_at
        var xrdSpent = results.transaction.fee_paid
        const TokenBalancesChnges = results.transaction.balance_changes.fungible_balance_changes
        console.log(TokenBalancesChnges)
        TokenBalancesChnges.map(async (balance) => {

            if (accountRegex.test(balance.entity_address)) {
                let balanceChange = balance.balance_change
                console.log(balance)
                const changedEntityMetaData = await getEntityMetadata(balance.resource_address)
                console.log( '&&&&&&&&&&&&&' + changedEntityMetaData)
                entityArryAccount.push({
                    balanceChange: balanceChange,
                    entityName: changedEntityMetaData.name,
                    entityUrl: changedEntityMetaData.iconurl
                })
            }

            if (compnentRegex.test(balance.entity_address)) {
                let balanceChange = balance.balance_change
                const changedEntityMetaData = await getEntityMetadata(balance.resource_address)
                console.log( '&&&&&&&&&&&&&' + changedEntityMetaData)
                entityArryComponent.push({
                    balanceChange: balanceChange,
                    entityName: changedEntityMetaData.name,
                    entityUrl: changedEntityMetaData.iconurl
                })
            }


        })

        // define component to return 
        const ReciptComponentAccount = ({ entityArryAccount }) => (
            <div>
                <h1>Changes in your Account</h1>
                <ol>
                    {entityArryAccount.map((entity, index) => (
                        <li key={index}>
                            <div className='flex flex-row'>
                                <span>
                                    <img src={entity.entityUrl} alt={entity.entityName} />
                                </span>
                                <span>{entity.entityName}</span>
                                <span>{entity.balanceChange}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        );

        const ReciptComponent = ({ entityArryComponent }) => (
            <div>
                <h1>Changes in Component</h1>
                <ol>
                    {entityArryComponent.map((entity, index) => (
                        <li key={index}>
                            <div className='flex flex-row'>
                                <span>
                                    <img src={entity.entityUrl} alt={entity.entityName} />
                                </span>
                                <span>{entity.entityName}</span>
                                <span>{entity.balanceChange}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        );

        const FeePaid = ({ xrdSpent }) => (
            <div className='flex flex-row'>
                <span className=''>XrdPaid</span>
                <span className='text-red-600'>{`-${xrdSpent}`}</span>
            </div>
        );

        const MyComponent = ({ entityArryAccount, entityArryComponent, xrdSpent }) => (
            <div>
                <FeePaid xrdSpent={xrdSpent} />
                <ReciptComponentAccount entityArryAccount={entityArryAccount} />
                <ReciptComponent entityArryComponent={entityArryComponent} />
            </div>
        );
        return (
            <div>
            <FeePaid xrdSpent={xrdSpent} />
            <ReciptComponentAccount entityArryAccount={entityArryAccount} />
            <ReciptComponent entityArryComponent={entityArryComponent} />
            </div>
        )



    } catch (error) {
        console.error('Error fetching transaction details:', error);
        return null;
    }

}

export default extractTransactionsData