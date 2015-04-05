# angular-schema-form-builder
A user interface for building definitions for angular-schema-form.

This repo is a response to [Schema-Form Issue #304](https://github.com/Textalk/angular-schema-form/issues/304). At the moment it's really just a public design document to facilitat collaboration from the community of Schema-Form users.

Main Goals
----------
- graphical interface for building form definitions, given a pre-existing schema
- direct integration with schema-form wherever possible (don't duplicate traversal logic/etc)
- direct integration with registered custom form types

Secondary Goals
---------------
- graphical interface for building a form definition, and its corresponding schema


Strategy
--------

![Palette, Preview, Inspector](https://rawgithub.com/mike-marcacci/angular-schema-form-builder/master/wireframe.svg)

###Palette
- a list of possible form types, populated from the configured decorator
- drag a list item to the preview section to insert a new form item

###Preview
- form is rendered by schema-form
- uses a dummy model so the user can test validations
- drag field to reorder
- click field to inspect

###Inspector
- shows configuration options for the form item selected in the preview section
- configuration options are rendered by schema-form
- configuration options are populated by the form type's definition on the decorator
- changes are reflected in the preview section
- a custom `builder-schema-key` form type is available for selecting the `key` property



Changes to Schema-Form
----------------------

For the above to be possible, schema-form will have to be modified to allow an object to be used when registering a form type with a decorator:

```js

// old style (should maintain backwards-compatibility)
schemaFormDecoratorsProvider.addMapping(
	'bootstrapDecorator',
	'datepicker',
	'directives/decorators/bootstrap/datepicker/datepicker.html'
);

// new style defining title, description, schema, and form for configuration
schemaFormDecoratorsProvider.addMapping(
	'bootstrapDecorator',
	{
		type: 'datepicker',
		title: 'DatePicker',
		description: 'Datepicker add-on for Angular Schema Form using pickadate!',
		form: ['*'],
		schema: {
			type: 'object',
			properties: {
				minDate: {
					type: ['string', 'null']
				},
				maxDate: {
					type: ['string', 'null']
				}
			}
		}
	},
	'directives/decorators/bootstrap/datepicker/datepicker.html'
);
```