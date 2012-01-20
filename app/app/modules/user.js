(function(User) {

	User.Model = Backbone.Model.extend({
		/* ... */
	});

	User.Collection = Backbone.Collection.extend({
		url: battlefront.config.apiBaseUrl,
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

			var userDetail = new User.Views.Detail({collection: userCollection});
    	}
	});

	// This will fetch the user template and render it.
	User.Views.List = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			this.collection.bind("reset", this.render);
		},

		template: "app/templates/user/list.html",

		render: function() {
			//console.log(this.collection.toJSON());
			var view = this;
			var done = function(el) {
				$("#main").html(el);
			};

			view.data = {
				users: this.collection.toJSON()
			};

			// Fetch the template, render it to the View element and call done.
			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(view.data);

				done(view.el);
			});
		}
	});

	User.Views.Detail = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			this.collection.bind("reset", this.render);
		},

		template: "app/templates/user/detail.html",

		render: function() {
			//console.log(this.collection.toJSON());
			var view = this;
			var done = function(el) {
				$("#main").html(el);
			};

			//there is only one item in our collection, so get that "first" (and only) item and send it to our detail view template
			view.data = this.collection.first().attributes;

			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(view.data);

				done(view.el);
			});
		}
	});

	var userRouter = new User.Router();

})(battlefront.module("user"));