import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import React, { useState } from 'react';
import axios from 'axios';

function Shortner() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortenedUrl, setShortenedUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (value) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9\\-\\._]+\\.[a-zA-Z]{2,})|([0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}))' + // domain name or IP address
      '(\\:[0-9]{1,5})?(\\/[^\\s]*)?)$' // port and path
    );
    return urlPattern.test(value);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setOriginalUrl(value);

    if (!validateUrl(value)) {
      setError("Please enter a valid URL"); 
    } else {
      setError("");
    }
  };

  const handleShortenUrl = async () => {
    if (!error && originalUrl) {
      try {
        const response = await axios.post('http://localhost:8080/api/shorten', { originalUrl });
        console.log(response);

        const shortenedUrlValue = response.data.id;

        // Check if the URL is already in localStorage
        if (!localStorage.getItem(originalUrl)) {
          localStorage.setItem(originalUrl, "http://localhost:8080/api/"+shortenedUrlValue);
        }

        // Set the shortened URL returned from the backend
        setShortenedUrl(shortenedUrlValue);
      } catch (err) {
        console.error("Error shortening URL:", err);
        setError("Failed to shorten the URL. Please try again.");
      }
    }
  };

  return (
    <div className="url-shortener-section">
      {/* Input for the original URL */}
      <div className="url-input my-16">
        <input
          type="text"
          placeholder="Original URL"
          className="my-16"
          value={originalUrl}
          onChange={handleInputChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          variant="secondary"
          className="bg-gray-500 rounded-xl"
          onClick={handleShortenUrl}  // Handle URL shortening
          disabled={!!error || !originalUrl} // Disable button if there's an error or the URL is empty
        >
          Shorten URL
        </Button>
      </div>

      {shortenedUrl && (
        <div className="url-shortener-section">
          <div className="shortened-url">
            <Textarea 
              value={`http://localhost:8080/api/${shortenedUrl}`} 
              readOnly 
            />
            <Button
              variant="secondary"
              className="bg-gray-500 rounded-xl px-10"
              onClick={() => navigator.clipboard.writeText(`http://localhost:8080/api/${shortenedUrl}`)}
            >
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Shortner;
