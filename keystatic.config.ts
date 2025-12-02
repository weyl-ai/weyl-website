// keystatic.config.ts
import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: {
      owner: 'weyl-ai', // TODO: Update this to your actual GitHub org/username
      name: 'weyl-website', // TODO: Update this to your actual repo name
    },
  },
  
  ui: {
    brand: { 
      name: 'Weyl CMS',
    },
    navigation: {
      'Content': ['blog'],
    },
  },

  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      
      schema: {
        title: fields.slug({ 
          name: { label: 'Title' } 
        }),
        
        description: fields.text({
          label: 'Description',
          description: 'Short description (max 160 chars, shows in preview cards and SEO)',
          validation: { 
            length: { 
              max: 160 
            } 
          },
        }),
        
        pubDate: fields.date({
          label: 'Publication Date',
          defaultValue: { kind: 'today' },
        }),
        
        updatedDate: fields.date({
          label: 'Updated Date',
          description: 'Optional - set if you update the post after publishing',
        }),
        
        author: fields.text({
          label: 'Author',
          defaultValue: 'Weyl Team',
        }),
        
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags',
            description: 'Add tags like "announcement", "infrastructure", "AI"',
            itemLabel: props => props.value,
          }
        ),
        
        draft: fields.checkbox({
          label: 'Draft',
          description: 'Check this to hide the post from the public blog',
          defaultValue: false,
        }),
        
        image: fields.object({
          src: fields.text({ 
            label: 'Image URL',
            description: 'Full URL to the blog post hero image'
          }),
          alt: fields.text({ 
            label: 'Image Alt Text',
            description: 'Describe the image for accessibility'
          }),
        }, {
          label: 'Hero Image',
          description: 'Optional featured image for the blog post',
        }),
        
        content: fields.mdx({
          label: 'Content',
          description: 'Write your blog post content here',
          options: {
            image: {
              directory: 'public/images/blog',
              publicPath: '/images/blog/',
            },
          },
        }),
      },
    }),
  },
});



