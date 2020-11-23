(function($) {
	
	function addFoldClassStyleNode() {
		$('head').append('<style>.__fold{-webkit-transform:rotate(0deg)}.__unfold{-webkit-transform:rotate(90deg)}</style>');
	}
	addFoldClassStyleNode();
	$.fn.extend({
		fold:function(foldList, isUnfold) {
			var s = $(this);
			if (isUnfold) {
				foldList.show();
				s.addClass('__unfold');
			} else {
				foldList.hide();
				s.addClass('__fold');
			}
			
			$(this).click(function() {
				foldList.toggle();
				s.toggleClass('__fold');
				s.toggleClass('__unfold');
			});
		}
	});
	
})(jQuery);