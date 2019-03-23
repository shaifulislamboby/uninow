const Validator = require('jsonschema').Validator;

const gradesSchema = {
    id: '/grades',
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        semester: { type: 'string' },
        grade: { type: 'string' },
        status: { type: 'string' },
        note: { type: 'string' },
        date: { type: 'string' },
    }
};

const distributionSchema = {
    id: '/distributions',
    type: 'object',
    properties: {
        key: { type: 'string' },
        value: { type: 'number' },
    }
};

const pageDataSchema = {
    id: '/pagedata',
    type: 'object',
    properties: {
        name: { type: 'string' },
        course: { type: 'string' },
        degree: { type: 'string' },
        averageGrade: { type: 'string' },
        grades: {
            type: 'array',
            items: { '$ref': '/grades' }
        },
        distribution: {
            type: 'array',
            items: { '$ref': '/distributions' }
        }
    }
};

function validateParsedData(parsedData) {
    const v = new Validator();
    v.addSchema(gradesSchema, '/grades');
    v.addSchema(distributionSchema, '/distributions');
    const result = v.validate(parsedData, pageDataSchema );
    return result.valid;
}

exports = module.exports = validateParsedData;