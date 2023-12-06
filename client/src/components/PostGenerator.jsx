  // Start of JSX file
  // Where posts are born (ChatGPT integration).
  import { useState, useEffect } from 'react';
  import { Link } from 'react-router-dom';
  import { useMutation } from '@apollo/client';

  import { ADD_POST } from '../utils/mutations';
  import { QUERY_POSTS, QUERY_ME } from '../utils/queries';

  import Auth from '../utils/auth';

  // implement ChatGPT API generation here!!!
  // Save post = new post

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
          setPostText(data.quote);
        } else {
          const text = await response.text();
          console.error('Received non-JSON response:', text);
        }
      } catch (error) {
        console.error("Error generating quote:", error);
      }
    };
    

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
            <button
              type="button"
              id="generateButton"
              onClick={handleGenerate}
              className="btn btn-primary mb-3"
            >
              Generate
            </button>
            <p>
              You need to be logged in to share your posts. Please <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
          </>
        )}
      </div>
    );
    
  };

  export default PostGenerator;
