import fs from 'fs';
import _ from 'lodash';

const config = {}
config['apiKey'] = _.get(process, 'env.FIREBASE_API_KEY', '');
config['authDomain'] = _.get(process, 'env.FIREBASE_AUTH_DOMAIN', '');
config['databaseURL'] = _.get(process, 'env.FIREBASE_DATABSE_URL', '');

fs.writeFileSync('./firebase-config.json', JSON.stringify(config));