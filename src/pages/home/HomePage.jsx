import "./HomePage.css";
import homepage1 from "./../../assets/homepage-1.jpg";
import homepage2 from "./../../assets/homepage-2.jpg";
import homepage3 from "./../../assets/homepage-3.jpg";
import homepage4 from "./../../assets/homepage-4.jpg";

const HomePage = () => {
  return (
    <div>
      <div className="home-blue-box">
        <h1>FIN/ACE</h1>
        <h2>Ace your finances</h2>
        <h3>
          Your personal finance hub - Where every decision counts and every plan
          unfolds.
        </h3>
      </div>

      <div className="home-sections">
        <div>
          <section>
            <h2>Comprehensive financial tracking</h2>
            <p>
              FIN/ACE offers a comprehensive platform for users to seamlessly
              track both their historical financial data (tracked) and future
              financial plans. The dual focus on past and future finances allows
              users to learn from their financial history while strategically
              planning for their financial future.
            </p>
          </section>

          <img src={homepage1} alt="Homepage img" />
        </div>

        <div>
          <img src={homepage2} alt="Homepage img" />
          <section>
            <h2>Intuitive data visualization</h2>
            <p>
              With user-friendly graphs, charts, and calculations, FIN/ACE
              transforms raw financial data into insightful visual
              representations. The platform empowers users to analyze their
              financial trends, identify patterns, and make informed decisions
              by presenting data in an easily understandable format.
            </p>
          </section>
        </div>

        <div>
          <section>
            <h2>Dashboard for comparative analysis</h2>
            <p>
              The dashboard feature serves as a command center, enabling users
              to compare and contrast their tracked and planned financial data.
              This bird's-eye view allows for quick assessments of financial
              performance, helping users identify areas of improvement and
              celebrate financial successes.
            </p>
          </section>

          <img src={homepage3} alt="Homepage img" />
        </div>

        <div>
          <img src={homepage4} alt="Homepage img" />
          <section>
            <h2>Effortless transaction management</h2>
            <p>
              The transactions tab simplifies data entry, whether it's for
              planned or tracked finances. Users can seamlessly input and
              organize their financial activities, ensuring a smooth and
              efficient process for keeping their records up-to-date. The
              user-friendly interface makes it easy for individuals at any
              financial literacy level to take control of their economic
              journey.
            </p>
          </section>
        </div>
      </div>
      {/* <p>Nattanan Kanchanaprat</p> */}
    </div>
  );
};

export default HomePage;
