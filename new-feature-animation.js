var newFeatureAnimation = {
	init: function($obj, message, tooltipPlacement, featureName) {
		// этот контрол нужен для ненавязчивого обучения пользователя функциям интерфейса, которыми он ещё не пользовался
		// вокруг объекта добавляются элементы с анимацией, которые привлекают к нему внимание
		var linesDistance = 30;
		function insertLines(direction, count, startAngle, angleDelta) {
			var randomDelay,
				line, 
				position, 
				positionValue = 0,
				rotation,
				rotationDelta;
			switch (direction) {
			  case "top":
			  	rotation = toptLinesStartAngle;
			    position = 'left';
			    rotationDelta = topLinesAngleDelta;
			    break;
			  case "right":
			  	rotation = rightLinesStartAngle;
			    position = 'top';
			    rotationDelta = sideLinesAngleDelta;
			    positionValue = -linesDistance/2;
			    break;
			  case "bottom":
			  	rotation = bottomLinesStartAngle;
			    position = 'right';
			    rotationDelta = topLinesAngleDelta;
			    break;
			  case "left":
			  	rotation = leftLinesStartAngle;
			    position = 'bottom';
			    rotationDelta = sideLinesAngleDelta;
			    positionValue = -linesDistance/2;
			    break;
			}
			for (var i = 0; i <= count; i++) {
				randomDelay = Math.random()*3;
				line = $('<div data-new-feature-animation-for="' + featureName + '" class="new-feature-animation-line ' + direction + '" style="animation-delay:' + randomDelay + ';-webkit-animation-delay:' + randomDelay + 's; ' + position + ': ' + positionValue + 'px; transform: rotateZ(' + rotation + 'deg);"></div>');
				$(line).appendTo($obj);
				positionValue += linesDistance;
				rotation += rotationDelta;
			};
		}
		$obj.attr('style', 'position: relative');
		var sideLinesCount = Math.round($obj.outerHeight() / linesDistance);
		var topLinesCount = Math.round($obj.outerWidth() / linesDistance);
		// top from -45 + topLinesAngleDelta to 45
		// right from 45 + sideLinesAngleDelta to 135
		// bottom from 135 + topLinesAngleDelta to 225
		// left from 225 + sideLinesAngleDelta + 315
		var sideLinesAngleDelta = 90 / sideLinesCount;
		var topLinesAngleDelta = 90 / topLinesCount;
		var toptLinesStartAngle = -45;
		var rightLinesStartAngle = 45;
		var bottomLinesStartAngle = 135;
		var leftLinesStartAngle = 225;
		// создаются линии со всех сторон от объекта
		insertLines('left', sideLinesCount);
		insertLines('right', sideLinesCount);
		insertLines('top', topLinesCount);
		insertLines('bottom', topLinesCount);
		// при наведении на объект показывается тултип с объяснением, как пользоваться фичей
		tooltipPlacement = tooltipPlacement || 'top'
		$obj.tooltip({
			placement: tooltipPlacement,
			title: message
		});
	},
	destroy: function($obj, featureName) {
		// удаляется анимация
		var linesSelector = '[data-new-feature-animation-for="' + featureName + '"]';
		$(linesSelector).remove();
		// удаляется тултип
		$obj.tooltip('destroy');
	}
}