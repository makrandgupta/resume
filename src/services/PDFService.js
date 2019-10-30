import _ from 'lodash';
import base from './../services/base';
import $ from 'jquery';
import Mustache from 'mustache';
// import template from '../templates/basic.mustache';

/**
 * 
 * @param {string} uid The UID of the user for whom to generate the PDF resume.
 * @param {string} template Name of the template to use for rendering
 */
const render = async (uid, template) => {
  // fetch data from firebase

  return console.log('template', template);
  let userData;

  try {
    userData = await base.fetch(uid, {});
  } catch (error) {
    // TODO: Show some error to the user
    return console.error('error fetching user data', error);
  }

  if (_.isEmpty(userData)) {
    return console.error('PDFService.render: Error fetching user data: user not initialized')
  }

  // process user data to convert objects into arrays where necessary
  const context = {};

  _.set(context, 'contacts', _.values(userData.contacts));
  _.set(context, 'experiences', _.values(userData.experiences));
  _.set(context, 'educations', _.values(userData.educations));
  _.set(context, 'skills', _.values(userData.skills));

  // load template

  $.get('basic.mustache', async (template) => {
    var rendered = Mustache.render(template, context);

    const uri = encodeURIComponent(`${base}?htmlContent=${rendered}`);

    fetch(uri)


    $('#target').html(rendered);
  });


  // inject data into template

  /**
   * send compiled template to https://us-central1-resume-makgupta.cloudfunctions.net/htmlToPdf
   * pass *ENCODED* html string as GET param 'htmlContent'
   */

  // relay response from pdf function and trigger download
}