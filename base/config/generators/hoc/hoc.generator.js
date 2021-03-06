var appModuleExists = require('./../../utils').appModuleExists;
var removeGitkeep = require('./../../utils').removeGitkeep;

module.exports = plop => {
    plop.setGenerator('hoc', {
        description: 'Create new HOC',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'name of HOC',
                validate: value => {
                    if (/.+/.test(value)) {
                        return appModuleExists(value) ? 'This hoc already exists' : true;
                    }

                    return 'The name is required';
                },
            },
        ],
        actions: function(data) {
            var actions = [
                {
                    type: 'add',
                    path: './../../src/app/hocs/__tests__/with{{pascalCase name}}.test.tsx',
                    templateFile: 'hoc/hoc.test.tsx.tpl',
                },
                {
                    type: 'add',
                    path: './../../src/app/hocs/with{{pascalCase name}}.tsx',
                    templateFile: 'hoc/hoc.tsx.tpl',
                },
            ];

            removeGitkeep('hocs');
            return actions;
        },
    });
};
