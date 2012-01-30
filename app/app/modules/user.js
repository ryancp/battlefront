(function(User) {

	User.Model = Backbone.Model.extend({
		initialize: function(){
			var memento = new Backbone.Memento(this);
			_.extend(this, memento);
		},

		validation: {
			email: {
				pattern: 'email'
			}
		}
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
			"click button.edit": "edit"
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

		edit: function(event) {
			var editUser = new User.Views.AddEdit({model: user});
			editUser.render();
		}
	});

	User.Views.AddEdit = Backbone.View.extend({
		initialize: function() {
			_.bindAll(this, 'render');
			//this.model.bind('validated:invalid', this.validationError);
			//this.model.bind('validated:valid', this.validationPass);
			//use backbone.memento to store model's original state, so it's easy to revert back to this upon "Cancel"
			this.model.store();
		},

		template: "app/templates/user/add_edit.html",

		events: {
			"click button.save": "save",
			"click button.cancel": "cancel"
		},

		render: function() {
			var view = this;
			var done = function() {
				$("#main").html(view.el);

				$("button.save").button();
				$("button.cancel").button();

				Backbone.ModelBinding.bind(view);
				Backbone.Validation.bind(view);
			};

			user = this.model
			view.data = user.toJSON();

			battlefront.fetchTemplate(this.template, function(tmpl) {
				view.el.innerHTML = tmpl(view.data);

				done(view);
			});
		},

		save: function(event) {
			if (this.model.isValid() == false) {
				return;
			}
			else {
				console.log(userCollection.models[0].attributes.email)
				var userDetail = new User.Views.Detail({
					collection: userCollection,
					id: this.model.id
				});
				userDetail.render();
			}
		},

		cancel: function(event) {
			//go back to the model's original state
			this.model.restore();
			var userDetail = new User.Views.Detail({
				collection: userCollection,
				id: this.model.id
			});
			userDetail.render();
		}/*,

		validationError: function() {
			$("button.save").attr("disabled", "true");
			$("button.save").addClass("disabled");
		},

		validationPass: function() {
			$("button.save").attr("disabled", "false");
			$("button.save").removeClass("disabled");
		}*/

	});

	var userRouter = new User.Router();

})(battlefront.module("user"));