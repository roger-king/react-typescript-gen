module.exports = (plop) => {
    console.log('Getting called.')
    plop.setGenerator("service", {
        description: "Create a new service.",
        prompts: [{
                type: "input",
                name: "name",
                message: "What would you like to call your service?"
            },
            {
                type: "confirm",
                name: "createStore",
                message: "Would like to create a store with your service?"
            }
        ],
        actions: function(data) {
            var actions = [{
                type: "add",
                path: "src/app/services/{{camelCase name}}/{{camelCase name}}.service.ts",
                templateFile: "build/templates/service/service.ts.tpl"
            }, {
                type: "add",
                path: "src/app/services/{{camelCase name}}/{{camelCase name}}.spec.ts",
                templateFile: "build/templates/service/service.spec.ts.tpl"
            }, {
                type: "add",
                path: "src/app/services/{{camelCase name}}/{{camelCase name}}.model.ts",
                templateFile: "build/templates/service/service.model.ts.tpl"
            }, {
                type: "modify",
                path: "src/app/services/index.ts",
                pattern: "// Global imports of services (do not remove - will break automation!)",
                template: "// Global imports of services (do not remove - will break automation!)\nexport {" +
                    " {{pascalCase name}}Service } from './{{camelCase name}}/{{camelCase name}}.serv" +
                    "ice';"
            }]
            if (data.createStore) {
                actions = actions.concat([{
                    type: "add",
                    path: "src/app/services/{{camelCase name}}/{{camelCase name}}.store.ts",
                    templateFile: "build/templates/service/service.store.ts.tpl"
                }, {
                    type: "modify",
                    path: "src/app/services/stores.ts",
                    pattern: "// Global imports of all stores (do not remove - will break automation!)",
                    template: "// Global imports of all stores (do not remove - will break automation!)\nexport" +
                        " { {{pascalCase name}}Store } from './{{camelCase name}}/{{camelCase name}}.stor" +
                        "e';"
                }, {
                    type: "modify",
                    path: "src/index.tsx",
                    pattern: " } from '.\/app\/services\/stores';",
                    template: ", {{pascalCase name}}Store } from './app/services/stores';"
                }, {
                    type: "modify",
                    path: "src/index.tsx",
                    pattern: "// Import Application Stores",
                    template: "import { {{pascalCase name}}Store } from './app/services/stores';"
                }, {
                    type: "modify",
                    path: "src/index.tsx",
                    pattern: "routing: routingStore",
                    template: "routing: routingStore,\n    {{snakeCase name}}_store: new {{pascalCase name}}Store()"
                }]);
            }

            return actions;
        }
    })
}