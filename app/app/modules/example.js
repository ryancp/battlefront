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
(function(Example) {

  Example.Model = Backbone.Model.extend({ /* ... */ });
  Example.Collection = Backbone.Collection.extend({ /* ... */ });
  Example.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Example.Views.Tutorial = Backbone.View.extend({
	template: "app/templates/example.html",

	render: function(done) {
	  var view = this;

	  var done = function() {
		$("#main").html(view.el);

		$('#test5 input[value=on]').button().click(function() {
		  $(this).prevAll('.target').widgeto({
			change: function(evt, x){
			  $('.level', this).text(x); // callback function
			}
		  })
		  .unbind('green5done') // in case 'on' is clicked more than once
		  .bind('green5done', function() {
			$('.level', this).text('undefined');
			alert('bye!');
		  });
		});
		$('#test5 input[value=darker]').button().click(function() {$(this).prevAll('.target').widgeto('darker')});
		$('#test5 input[value=lighter]').button().click(function() {$(this).prevAll('.target').widgeto('lighter')});
		$('#test5 input[value=off]').button().click(function() {$(this).prevAll('.target').widgeto('off')});

	  };

	  // Fetch the template, render it to the View element and call done.
	  battlefront.fetchTemplate(this.template, function(tmpl) {
		view.el.innerHTML = tmpl();

		done(view);
	  });
	}
  });

})(battlefront.module("example"));