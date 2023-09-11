import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = new sanityClient({
  projectId: 'nvdzs4p6',
  dataset: 'production',
  apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
  token: process.env.BLOG_TOKEN, // or leave blank for unauthenticated usage
  useCdn: true,
});

export const urlFor = source => imageUrlBuilder(client).image(source);
