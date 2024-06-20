import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const vaporwavePrompt =
  "vaporwave themed ,lots of detailed reflections, ray traced reflections, colorful lights";
const surrealPrompt =
  "ui frame for a tarot-themed video game, windows vista, ui/gui, alchemical and astrological symbolism, medieval fantasy, pixel art, beautiful, in the style of vaporwave, dominant hot pink, beautiful, masterpiece, bespoke, 90s retro --ar 16:9 --style raw --v 6.0 --no blur, noise, background, sky, landscape, mountains, lake --sref";

const ImageFetcher: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [imageBlobUrl, setImageBlobUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchImage = async (combinedPrompt: string) => {
    setLoading(true);
    setError("");
    try {
      //   console.log("Sending request to API with prompt:", combinedPrompt);
      const response = await axios.post(
        "https://img-to-text.akshitgaur2003.workers.dev/gen",
        { prompt: combinedPrompt },
        {
          responseType: "blob", // Important to indicate the response type as blob
        }
      );

      const blob = new Blob([response.data], { type: response.data.type });
      const imageUrl = URL.createObjectURL(blob);
      setImageBlobUrl(imageUrl);
    } catch (err) {
      console.error("Error generating image:", err);
      setError("Error generating image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateClick = () => {
    setImageBlobUrl(""); // Reset image URL
    fetchImage(prompt);
  };

  const handleVaporwaveClick = () => {
    const combinedPrompt = `${prompt} ${vaporwavePrompt}`;
    setImageBlobUrl(""); // Reset image URL
    fetchImage(combinedPrompt);
  };

  const handleSurrealClick = () => {
    const combinedPrompt = `${prompt} ${surrealPrompt}`;
    setImageBlobUrl(""); // Reset image URL
    fetchImage(combinedPrompt);
  };

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8"
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(https://i.pinimg.com/originals/2a/18/28/2a1828953946a9f16a30e2580a16b637.gif)`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="max-w-md w-full space-y-4">
          <div>
            <h2 className="mt-6 text-center text-3xl font-semibold text-gray-900">
              Generate an AI Image
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Enter a prompt to generate an image using our AI service
            </p>
          </div>
          <div className="rounded-md shadow-sm -space-y-px px-8">
            <div>
              <label htmlFor="prompt" className="sr-only">
                Prompt
              </label>
              <input
                id="prompt"
                name="prompt"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
          </div>

          <div className="flex space-x-2 px-8">
            <button
              onClick={handleGenerateClick}
              disabled={loading}
              className={`group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading
                  ? "bg-gray-500"
                  : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }`}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            <button
              onClick={handleVaporwaveClick}
              disabled={loading}
              className={`group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading
                  ? "bg-gray-500"
                  : "bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              }`}
            >
              Vaporwave
            </button>
            <button
              onClick={handleSurrealClick}
              disabled={loading}
              className={`group relative flex-1 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                loading
                  ? "bg-gray-500"
                  : "bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              }`}
            >
              Surreal Art
            </button>
          </div>

          {error && (
            <p className="mt-2 text-center text-sm text-red-600">{error}</p>
          )}
          <div className="mt-6 flex justify-center ">
            {loading ? (
              <img
                src={
                  "https://i.pinimg.com/originals/c6/ea/8e/c6ea8e9623abb4ca57e0594e5766c872.gif"
                }
                alt="Loading..."
                className="rounded-xl shadow-lg object-cover  h-[40vh] w-[40vh]  lg:h-[60vh] lg:w-[60vh] "
              />
            ) : imageBlobUrl ? (
              <img
                src={imageBlobUrl}
                alt="Generated"
                className="rounded-xl shadow-lg object-cover  h-[40vh] w-[40vh]  lg:h-[60vh] lg:w-[60vh] "
              />
            ) : (
              <div className="">
                <img
                  src="https://64.media.tumblr.com/3d5c5e633053aeb4cb1d7e5b29cad3c5/tumblr_penkczTZQS1xcd22go1_540.gif"
                  alt="placeholder"
                  className="rounded-xl shadow-lg object-cover  h-[40vh] w-[40vh]  lg:h-[60vh] lg:w-[60vh] "
                />
              </div> // Blank placeholder div
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageFetcher;
