import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function DisabledAccordion() {
  const faqs = [
  {
    question: "How do I create a new test?",
    answer: "To create a new test, navigate to the 'Create Test' section and follow the step-by-step instructions provided. You can add various question types and customize test settings to meet your requirements.",
  },
  {
    question: "Can I import questions from a file?",
    answer: "Yes, our platform allows you to import questions from a CSV or Excel file. Simply select the 'Import Questions' option and follow the prompts to upload your file and populate your question bank effortlessly.",
  },
  {
    question: "Is there a limit to the number of questions in a test?",
    answer: "No, there is no strict limit on the number of questions in a test. However, consider the time constraints and the attention span of the test-takers when creating longer tests. It's recommended to keep tests concise and focused.",
  },
  {
    question: "How do I analyze test results?",
    answer: "After test completion, you can view detailed analytics and individual performance reports in the 'Results' section. Identify trends, strengths, and areas for improvement to enhance your teaching or training strategies.",
  },
  {
    question: "Is my data secure on your platform?",
    answer: "Yes, we take data security seriously. Our platform employs robust encryption protocols and follows industry best practices to ensure the confidentiality and integrity of your data. Rest assured that your information is in safe hands.",
  },
];

  return (
    <div className='mx-28 my-8'>
      <h1 className='text-3xl font-bold mb-4'>Frequently Asked Questions</h1>
          {faqs.map((faq, index) => (
            <div key={index}>
              <Accordion className='my-2'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography key={index}>{faq.question}</Typography>
                </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                     {faq.answer}
                    </Typography>
                  </AccordionDetails>
              </Accordion>
          </div>
          ))}
    </div>
  );
}