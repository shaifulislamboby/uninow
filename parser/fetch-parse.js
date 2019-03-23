const config = require('config');
const cheerio = require('cheerio');
const axios = require('axios');
const log = require('debug')('server:parser:grades');

// helper function
const parseMeta = require('./parse-meta');
const parseGrades = require('./parse-grades');
const mapDistribution = require('./map-distribution');
const validate = require('./validator');

async function fetchPage(url) {
    try {

        const { data: pageContent } = await axios.get(url);
        return pageContent;

    } catch (err) {
        log(`ERR_FETCHPAGE: ${err.message}`);
    }

    return null;
}

function parseData(content) {
    try {
        if (typeof content !== 'string') {
            throw new TypeError('Invalid html page.');
        }

        // object to hold parsed contents
        let data = {
            name: '',
            course: '',
            degree: '',
            averageGrade: '',
            grades: [ ],
            distribution: [ ]
        };

        // to html dom queryable object
        const $ = cheerio.load(content);

        // basic info available on <p> tags
        const pTagContents = $('#info').find('p').toArray()
            .map((el) => $(el).text().trim())
            .filter((line) => line.length > 0);
        //log(`PTAGS: ${JSON.stringify(pTagContents, null, 2)}`);
        // find course info
        data = { ...data, ...parseMeta(pTagContents) };

        // individual grades are in table
        const tableRows = $('#course-grades').find('tr').toArray().slice(1);

        for(const el of tableRows) {
            const dataCells = $(el).find('td').toArray().map((td) => $(td).text().trim());
            //log(`TDTAGS: ${JSON.stringify(dataCells, null, 2)}`);
            const courseGrade = parseGrades(dataCells);
            if (courseGrade != null) {
                data.grades.push(courseGrade);
            }
        }

        data.distribution = mapDistribution(data.grades);
        return data;

    } catch (err) {
        log(err.message);
        return null;
    }
}

async function parsePage() {
    try {
        // here use some service/records to determine url
        const pageUrl = config.get('gradePages.sampleUrl');
        log(`url to parse = ${pageUrl}`);
        const parsedData = parseData( await fetchPage(pageUrl) );

        if (!validate(parsedData)) {
            throw new Error('Content parser failed to extract data');
        }

        return parsedData;
    } catch (err) {
        log(`ERR_PARSEPAGE: ${err.message}`);
        return null;
    }

}

exports = module.exports = parsePage;