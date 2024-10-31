import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-10-31', 
  useCdn: false, 
  token: import.meta.env.VITE_SANITY_API_TOKEN, 
});

export default sanityClient;
