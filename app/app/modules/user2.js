// Use an IIFE...
// (http://benalman.com/news/2010/11/immediately-invoked-function-expression/)
// to assign your module reference to a local variable, in this case Example.
//
// Change line 16 'Example' to the name of your module, and change line 38 to
// the lowercase version of your module name.  Then change the namespace
// for all the Models/Collections/Views/Routers to use your module name.
//
// For example: Renaming this to use the module name: Project
//
// Line 16: (function(Project) {
// Line 38: })(namespace.module("project"));
//
// Line 18: Project.Model = Backbone.Model.extend({
//
(function(User) {

	User.Model = Backbone.Model.extend({
		url: battlefront.apiBaseUrl
	});

	User.Collection = Backbone.Collection.extend({
		/* ... */
	});

	var userCollection = new User.Collection;

	User.Router = Backbone.Router.extend({
		routes: {
      		"user": "user"
    	},
    	user: function(hash) {
			var route = this;
			var userList = new User.Views.List();

			// Attach the tutorial to the DOM
			userList.render(function(el) {
				$("#main").html(el);
			});
    	}
	});

	var userRouter = new User.Router;

	// This will fetch the user template and render it.
	User.Views.List = Backbone.View.extend({
		template: "app/templates/user/list.html",

		render: function(done) {
			var view = this;

			var params = {
				controller: "user",
				id: 1
			};

			var userModel = new User.Model;

			userModel.fetch({
				data: params
			});

			// Fetch the template, render it to the View element and call done.
			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(userModel.toJSON());

				done(view.el);
			});
		}
	});

})(battlefront.module("user"));