// Start of JSX file
// Home page for web page; shows posts from other users.
import { useQuery } from '@apollo/client';

import PostList from '../components/PostList';
import PostGenerator from '../components/PostGenerator';

import TParticles from '../components/Particles';

import { QUERY_POSTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const posts = data?.posts || [];

  return (
    <main>
      <TParticles />
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <PostGenerator />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <PostList
              posts={posts}
              title="Look at these Rizzlers!"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
// End of JSX file