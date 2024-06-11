import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const markdown = `
# The Future of Artificial Intelligence

Artificial Intelligence (AI) is transforming the world as we know it. From healthcare to finance, and education to entertainment, AI technologies are driving innovation and efficiency at an unprecedented pace. In this blog post, we will explore the current state of AI, its potential future applications, and the ethical considerations that come with its advancement.

## What is AI?

Artificial Intelligence refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. These systems can perform tasks such as recognizing speech, making decisions, and translating languages.

## Current Applications of AI

### Healthcare

AI is revolutionizing healthcare by providing tools for early diagnosis, personalized treatment plans, and efficient management of healthcare systems. For instance, AI algorithms can analyze medical images with high accuracy to detect diseases such as cancer at early stages.



### Finance

In the financial sector, AI is being used for fraud detection, risk management, and automated trading. AI models can analyze vast amounts of financial data to predict market trends and optimize investment strategies.

### Education

AI-driven educational tools provide personalized learning experiences, helping students learn at their own pace. AI can also assist teachers by automating administrative tasks and providing insights into student performance.

## The Future of AI

The future of AI holds even more exciting possibilities. Here are a few potential developments:

### Autonomous Vehicles

AI-powered autonomous vehicles are expected to transform transportation by reducing accidents, decreasing traffic congestion, and providing mobility solutions for those unable to drive.

### Natural Language Processing (NLP)

>Advancements in NLP will enable more natural and intuitive interactions between humans and machines. This could lead to better virtual assistants, more accurate language translation, and improved accessibility for individuals with disabilities.

### AI in Creative Industries

AI is already being used to create music, art, and literature. As these technologies advance, we can expect AI to play an even greater role in creative processes, augmenting human creativity and producing entirely new forms of artistic expression.

## Ethical Considerations

While AI offers immense potential, it also raises important ethical questions. These include concerns about privacy, bias in AI algorithms, job displacement, and the need for transparent and accountable AI systems.

### Privacy

As AI systems collect and analyze vast amounts of personal data, ensuring privacy and data security becomes paramount. It is essential to implement robust measures to protect individuals' information.

### Bias and Fairness

AI algorithms can inadvertently perpetuate biases present in the training data. It is crucial to develop methods to identify and mitigate bias to ensure fair and equitable AI systems.

### Job Displacement

Automation powered by AI may lead to job displacement in various sectors. Preparing the workforce for this transition through reskilling and upskilling initiatives is vital.

### Transparency and Accountability

AI systems should be transparent and accountable. This includes understanding how AI decisions are made and having mechanisms in place to address any issues that arise.

## Conclusion

Artificial Intelligence is poised to reshape our world in profound ways. As we navigate this transformative technology, it is essential to consider both its incredible potential and the ethical responsibilities that come with it. By doing so, we can harness the power of AI to create a better, more equitable future for all.



---

Thank you for reading! If you have any questions or thoughts on AI, feel free to leave a comment below.
`;

const styles = {
    h1: {
        fontSize: '2em',
        fontWeight: 'bold',
    },
    h2: {
        fontSize: '1.5em',
        fontWeight: 'bold',
    },
    h3: {
        fontSize: '1.17em',
        fontWeight: 'bold',
    },
    p: {
        marginBottom: '1em',
    },
    blockquote: {
        paddingLeft: '1em',
        borderLeft: '4px solid #ccc',
        color: '#666',
        fontStyle: 'italic',
        marginTop:"10px"
    },
    ul: {
        listStyleType: 'disc',
        paddingLeft: '2em',
    },
    table: {
        borderCollapse: 'collapse',
        width: '100%',
    },
    th: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    td: {
        border: '1px solid #ddd',
        padding: '8px',
    },
    img: {
        maxWidth: '100%',
        aspectRatio: '16 / 9',
        height: 'auto',
    }
};
const extractHeadings = (markdownContent) => {
    const headings = markdownContent.match(/^#{1,6}\s.*$/gm); // Regular expression to match headings
    return headings ? headings.map((heading) => heading.replace(/^#+\s/, '')) : []; // Removing the '#' and returning the headings
};
const HeadingsList = ({ headings }) => (
    <ul>
        {headings.map((heading, index) => (
            <li className='text-blue-600 font-semibold text-sm' key={index}>{heading}</li>
        ))}
    </ul>
);
const One = () => {
    const headings = extractHeadings(markdown);

    return (
        <div className='flex md:flex-row flex-col items-center justify-center'>
            {/* <div className='pt-32 md:pl-2 px-4 w-1/3' >
            <div className='font-semibold text-2xl'>
            Content

            </div>
            <HeadingsList headings={headings} />

            </div> */}
        <div className='min-h-screen md:py-28 md:px-10 w-2/3 pt-20 px-2 flex flex-col text-left items-start justify-center'>
           <img src="https://fastly.picsum.photos/id/674/600/400.jpg?hmac=EmoD53Q0Yur53pcP9l0A7_hBwJz5YdEBbBlWlfl9FiU" alt="" className='bg-black w-full border-2 aspect-video mb-5'/>
           
            <Markdown 
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ ...props}) => <h1 style={styles.h1} {...props} />,
                    h2: ({...props}) => <h2 style={styles.h2} {...props} />,
                    h3: ({ ...props}) => <h3 style={styles.h3} {...props} />,
                    p: ({ ...props}) => <p style={styles.p} {...props} />,
                    blockquote: ({ ...props}) => <blockquote style={styles.blockquote} {...props} />,
                    ul: ({...props}) => <ul style={styles.ul} {...props} />,
                    table: ({ ...props}) => <table style={styles.table} {...props} />,
                    th: ({ ...props}) => <th style={styles.th} {...props} />,
                    td: ({...props}) => <td style={styles.td} {...props} />,
                    img: ({...props}) => <img style={styles.img} {...props} />
                }}
            >
                {markdown}
            </Markdown>
        </div>
        </div>
        
    );
}

export default One;
