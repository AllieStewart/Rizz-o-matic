// Start of JSX file
// FAQ page about the website.
import TParticles from '../components/Particles';

const FAQ = () => {
return (
    <main className="flex-row justify-center mb-4">
      <TParticles />
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header text-light p-2">Frequently Asked Questions</h4>
          <div className="postBox card-body">
          <div className="card-body bg-light p-2">
            <h5>How'd this idea come about?</h5>
            <p>Our lovely TA Diem actually brought about the idea of a 'rizz' generator when we were brainstorming, haha.</p>
          <h5>Why ChatGPT?</h5>
          <p>We found it very easy to implement (after the initial horror of establishing back-end connections), as the API keys are secure, and with a specific prompt, it gets things done accordingly.</p>
            <h5>What's up with the 'rizz'?</h5>
            <p>It's an odd word that some zoomers came up with, we just rolled with it. It means, to be charismatic, to have charisma... Char-rizz-ma. Rizz.</p>
          <h5>Future plans?</h5>
          <p>The scope of the Rizz-o-Matic may be extended to other avenues, such as giving helpful dating tips, allowing people to connect more easily, and adding more API utilization (maybe use something else other than ChatGPT).</p>
          </div>
        </div>
      </div>
     </div>
    </main>
);
};

export default FAQ;
// End of JSX file