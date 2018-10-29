# Resume Manager

Central platform to store and manage your resume data and to generate custom resumes for different positions. 

## Development

You will need the following installed globally:
- yarn
- Node.js (v8+)

To get started, run the following commands:
```bash
> cd resume   # navigate into the root folder
> yarn        # install the project dependencies
> yarn start  # fire up the dev server
```

### Available scripts
Command             | Description 
--------------------|-------------
`yarn start`        | Start the React development server. Auto-reloads on file-save.
`yarn build`        | Generate minified files for a production build into `/build`.
`yarn deploy`       | Deploys the static files from `/build` to `resume.makgupta.com` using surge.
`yarn build:deploy` | Generate a fresh build and deploy the site.
`yarn lint`         | Run `eslint` on all `.jsx` files.
`yarn lint:fix`     | Attempt to fix all the issues found by `eslint`.
