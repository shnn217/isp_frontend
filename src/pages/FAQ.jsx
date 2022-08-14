import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import topics from "../style/pages/Topics.module.scss";
import classes from "../style/pages/Home.module.scss";
function Profilepage({ user }) {
  let location = useLocation();
  const [questions, setQuestions] = useState([
    {
      key: "1",
      title: "What is ISP?",
      content:
        "ISP is short for International Student Platform, which is a platform or you can said a social media specific design for international student perspective. This platform encourage user to use their LinkedIn account to sign in, and can ask question to other user, allow them connect each other and share value information.",
    },
    {
      key: "2",
      title: "How do I register an account?",
      content:
        "Simply like other websites, at the login page, click on Sign Up or click LinkedIn to use your LinkedIn account to login (recommended).",
    },
    {
      key: "3",
      title: "Is it only allowed international student to use ISP?",
      content:
        "Of course not, we encourage every one across the UK to use this platform and help each other to thrive and grow, coming from different countries and cultures, it is always excited that can learn something new from others.",
    },
    {
      key: "4",
      title: "Do I have to pay to use ISP?",
      content: `No, not at all. It is totally free. But the contributor won't say no to money, if someone want to make a donation.`,
    },
    {
      key: "5",
      title: "How to apply PSW visa?",
      content: (
        <>
          See more detail on{" "}
          <a href="https://www.gov.uk/graduate-visa">
            https://www.gov.uk/graduate-visa
          </a>
        </>
      ),
    },
  ]);
  const news = [
    {
      key: "1",
      title: "Grocery price in UK",
      content: "https://www.nimblefins.co.uk/average-uk-household-cost-food",
    },
    {
      key: "2",
      title: "Security and Living standard in UK",
      content: "https://xploria.co.uk/",
    },
    {
      key: "3",
      title: "Immigration",
      content: "https://www.gov.uk/check-uk-visa",
    },
    {
      key: "4",
      title: "UK festival",
      content: `https://www.elle.com/uk/life-and-culture/travel/a30291/festival-guide-uk/`,
    },
    {
      key: "5",
      title: "Language Exchange Society",
      content:
        "https://brignews.com/2021/04/15/about-the-language-exchange-society-and-living-in-between-cultures/",
    },
    {
      key: "6",
      title: "Language Exchange Society",
      content: ` https://brignews.com/2021/04/15/about-the-language-exchange-society-and-living-in-between-cultures/`,
    },
    {
      key: "7",
      title: "Salary tax",
      content: " https://salaryaftertax.com/salary-calculator/uk",
    },
    {
      key: "8",
      title: "Job search",
      content: "   https://www.glassdoor.co.uk/",
    },
  ];

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.con}>
          <div className={classes.left}>
            <div></div>
          </div>
          <div className={topics.FAQModal}>
            <div className={topics.container}>
              <div className={topics.FAQtitle}>FAQ</div>
              <div className={classes.flexBox}>
                <ul className={topics.FAQBlock}>
                  {questions.map((q) => (
                    <div className={topics.block} key={q.key}>
                      <li>{q.title}</li>
                      <div>{q.content}</div>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className={classes.right}>
         
            <ul className={topics.container}>
            <div className={topics.FAQtitle}>News</div>
              {news.map((ne) => (
                <li className={topics.new} key={ne.key}>
                  <a href={ne.content}>{ne.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profilepage;
