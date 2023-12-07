  // Start of JSX file
  // Where posts are born (ChatGPT integration).
  import { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { useMutation } from '@apollo/client';

  import { ADD_POST } from '../utils/mutations';
  import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

  import Auth from '../utils/auth';

  // implement ChatGPT API generation here!!!
  // Save post = new posttt

  const TypingEffect = ({ text, onTypingDone }) => {
    const [displayedText, setDisplayedText] = useState('');
    
    useEffect(() => {
      if(text === '') {
        setDisplayedText(''); // Clear previous text
        return;
      }
  
      let index = 0;
      const timeoutId = setInterval(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        index++;
        if (index === text.length) {
          clearInterval(timeoutId);
          if(onTypingDone) onTypingDone(); // Notify when typing is done
        }
      }, 50); // The speed of typing, in milliseconds.
    
      return () => clearInterval(timeoutId); // Cleanup on component unmount.
    }, [text, onTypingDone]);
    
    return <span>{displayedText}</span>;
  };

  const PostGenerator = () => {
    const [postText, setPostText] = useState('');
    const [generatedQuote, setGeneratedQuote] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const [addPost, { error }] = useMutation
    (ADD_POST, {
      refetchQueries: [
        QUERY_POSTS,
        'getPosts',
        QUERY_ME,
        'me'
      ]
    });

    useEffect(() => {
      console.log('Post text updated:', postText);
    }, [postText]); 

    const handleGenerate = async () => {
      console.log('Clicked generate button');
      try {
        const response = await fetch('/generate-quote');
        const contentType = response.headers.get('content-type');
        
        if (contentType.includes('application/json')) {
          const data = await response.json();
          const quote = data.quote;
          setPostText(''); // Clear the textarea first
          for (let i = 0; i <= quote.length; i++) {
            setTimeout(() => {
              setPostText(quote.slice(0, i));
            }, i * 50); // Typing speed
          }
        } else {
          const text = await response.text();
          console.error('Received non-JSON response:', text);
        }
      } catch (error) {
        console.error("Error generating quote:", error);
      }
    };

    useEffect(() => {
      if(generatedQuote !== '') {
        setPostText(generatedQuote);
      }
    }, [generatedQuote]); 
    

    const handleFormSubmit = async (event) => {
      event.preventDefault();

      try {
        const { data } = await addPost({
          variables: {
            postText,
            postAuthor: Auth.getProfile().data.username,
          },
        });

        setPostText('');
      } catch (err) {
        console.error(err);
      }
    };

    const handleChange = (event) => {
      const { name, value } = event.target;

      if (name === 'postText' && value.length <= 280) {
        setPostText(value);
        setCharacterCount(value.length);
      }
    };

    return (
      <div>
        <h3>Generate your Rizz here!</h3>
        {Auth.loggedIn() ? (
          <>
            <p className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''}`}>
              Character Count: {characterCount}/280
            </p>
            <form className="flex-row justify-center justify-space-between-md align-center" onSubmit={handleFormSubmit}>
              <div className="col-12 col-lg-9">
                <textarea
                  name="postText"
                  placeholder="Here's a new post..."
                  value={postText}
                  className="form-input w-100"
                  style={{ lineHeight: '1.5', resize: 'vertical' }}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-12 col-lg-3">
                <button className="btn btn-primary btn-block py-3" type="submit">
                  Add Post
                </button>
              </div>
              {error && (
                <div className="col-12 my-3 bg-danger text-white p-3">
                  {error.message}
                </div>
              )}
            </form>
          </>
        ) : (
          <>
            <textarea
              name="postText"
              placeholder="Here's a new post..."
              value={postText}
              className="form-input w-100"
              style={{ lineHeight: '1.5', resize: 'vertical' }}
              onChange={handleChange}
            ></textarea>
            <button
              type="button"
              id="generateButton"
              onClick={handleGenerate}
              className="btn btn-primary mb-3"
            >
              Generate
            </button>
            <TypingEffect text={generatedQuote} onTypingDone={() => {}} />
            <p>
              You need to be logged in to share your posts. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
          </>
        )}
      </div>
    );
    
  };

<<<<<<< Updated upstream
  export default PostGenerator;
=======
  export default PostGenerator;
>>>>>>> Stashed changes
