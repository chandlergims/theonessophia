export default function About() {
  return (
    <div className="min-h-screen bg-[rgb(19,19,19)]">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          About Regenesis
        </h1>
        
        <div className="bg-[rgb(25,25,25)] rounded-lg p-8 shadow-lg">
          <p className="text-lg text-gray-300 mb-8">
            Regenesis is a live experiment in recursive generation, where community-chosen visuals are regenerated 
            infinitely to observe patterns of drift, entropy, and artificial evolution.
          </p>
          
          <div className="bg-[rgb(35,35,35)] rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-lg text-gray-300">
              Regenesis is an experimental investigation into AI feedback loops, leveraging community-voted 
              images to study the progressive distortion and emergent behavior of iterative regeneration.
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-white mt-8 mb-4">How It Works</h2>
          <div className="space-y-6 text-lg text-gray-300">
            <p>
              <span className="text-red-500 font-bold">1.</span> Community members vote on candidate images to be included in the feedback loop experiment.
            </p>
            <p>
              <span className="text-red-500 font-bold">2.</span> The winning image becomes the seed for a regeneration cycle.
            </p>
            <p>
              <span className="text-red-500 font-bold">3.</span> Our system repeatedly regenerates the image, using each output as the input for the next iteration.
            </p>
            <p>
              <span className="text-red-500 font-bold">4.</span> The resulting sequence reveals fascinating patterns of how AI systems interpret and transform visual information over time.
            </p>
          </div>
          
          <div className="bg-[rgb(35,35,35)] rounded-lg p-6 mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">Future Plans</h2>
            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-red-500 font-semibold">Token-Gated Creation:</span> Soon, users will be able to create their own feedback loops through our token-gated system, ensuring high-quality submissions.
              </p>
              <p>
                <span className="text-red-500 font-semibold">Advanced Analytics:</span> We're developing tools to analyze patterns in image evolution across thousands of iterations.
              </p>
              <p>
                <span className="text-red-500 font-semibold">Community Governance:</span> Token holders will help guide the direction of our research and experiments.
              </p>
              <p>
                <span className="text-red-500 font-semibold">Cross-Modal Experiments:</span> Future plans include expanding beyond images to explore text, audio, and other media types.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
