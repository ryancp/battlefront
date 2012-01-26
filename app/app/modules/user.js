(function(User) {

	User.Model = Backbone.Model.extend({
		/* ... */
	});

	User.Collection = Backbone.Collection.extend({
		url: battlefront.application_config.apiBaseUrl,
		model: User.Model
	});

	var userCollection = new User.Collection();

	User.Router = Backbone.Router.extend({
		routes: {
			"user": "userList",
			"user/:id": "userDetail"
		},
		userList: function() {
			var params = {
				controller: "user"
			};

			userCollection.fetch({
				data: params
			});

			var userList = new User.Views.List({collection: userCollection});
		},
		userDetail: function(id) {
			var params = {
				controller: "user",
				id: id
			};

			userCollection.fetch({
				data: params
			});

			var userDetail = new User.Views.Detail({
				collection: userCollection,
				id: id
			});
		}
	});

	User.Views.List = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			this.collection.bind("reset", this.render);
		},

		template: "app/templates/user/list.html",

		render: function() {
			var view = this;
			var done = function(view) {
				$("#main").html(view.el);
				view.collection.unbind("reset", this.render);
			};

			view.data = {
				users: this.collection.toJSON()
			};

			// Fetch the template, render it to the View element and call done.
			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(view.data);

				done(view);
			});
		}
	});

	User.Views.Detail = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			this.collection.bind("reset", this.render);
		},

		template: "app/templates/user/detail.html",

		events: {
			"click button.edit": "editThis"
		},

		render: function() {
			var view = this;
			var done = function() {
				$("#main").html(view.el);

				$("button.edit").button();
				view.collection.unbind("reset", this.render);
			};

			user = this.collection.get(this.id);
			view.data = user.toJSON();

			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(view.data);

				done(view);
			});
		},

		editThis: function(event) {
			var editUser = new User.Views.AddEdit({model: user});
			editUser.render();
		}
	});

	User.Views.AddEdit = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
		},

		template: "app/templates/user/add_edit.html",

		events: {
			"click button.save": "saveThis",
			"click button.cancel": "cancelThis"
		},

		render: function() {
			var view = this;
			var done = function() {
				$("#main").html(view.el);

				$("button.save").button();
				$("button.cancel").button();
			};

			user = this.model
			view.data = user.toJSON();

			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(view.data);

				done(view);
			});
		},

		saveThis: function(event) {
			alert('save user');
		},

		cancelThis: function(event) {
			var userDetail = new User.Views.Detail({
				collection: userCollection,
				id: user.id
			});
			userDetail.render();
		},
	});

	var userRouter = new User.Router();

})(battlefront.module("user"));