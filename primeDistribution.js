var dist = function(goal){
	if(goal < 2)
		return [];
	else if(goal == 2)
		return [2]; 

	this.primeTable = [2];
	this.loops = 0;
	/* proof : table[ sqrt_number-1 ] >= sqrt(number)  */
	// if proof is true
	this.proof = true;

	for(var number = 3, sqrNum; number <= goal ; number+=2){

		//save 1- sqrt(number) loop times 
		sqrNum = Math.floor(Math.sqrt(number));

		// And operator with false -> if one case false, result is false
		this.proof &= ( this.primeTable[ sqrNum-1 ] >= sqrNum);

		while(sqrNum != 0){
			if( !(number % this.primeTable[--sqrNum]) ){
				break;
			}

			if(sqrNum == 0){
				this.primeTable.push(number);
			}
			this.loops ++;
		}
	}
	console.log( "proof: " + this.proof );
	console.log( "loops: " + this.loops);
	console.log( "length: "+ this.primeTable.length );

	return this.primeTable;
}

function bands(table, goal, range){
	var d = new Array( Math.ceil( goal/range ) ),
		result = {};
	
	for(var index = 0; index < d.length; index++){
		d[index] = { x : index, y : 0 };
	};

	table.forEach(function(value){
		d[ parseInt( Math.floor(value/range) ) ].y ++;
	});

	return d;
}

(function Question(){
"                   _______ _________      _________ _______       _________          _______        __    _______  _______  _______  _______  _______  _______ _________                _______  _______ _________ _______  _______   _____  "
"|\     /||\     /|(  ___  )\__   __/      \__   __/(  ____ \      \__   __/|\     /|(  ____ \      /  \  (  __   )(  __   )(  __   )(  __   )(  __   )(  __   )\__   __/|\     /|      (  ____ )(  ____ )\__   __/(       )(  ____ \ / ___ \ "
"| )   ( || )   ( || (   ) |   ) (            ) (   | (    \/         ) (   | )   ( || (    \/      \/) ) | (  )  || (  )  || (  )  || (  )  || (  )  || (  )  |   ) (   | )   ( |      | (    )|| (    )|   ) (   | () () || (    \/( (   ) )"
"| | _ | || (___) || (___) |   | |            | |   | (_____          | |   | (___) || (__            | | | | /   || | /   || | /   || | /   || | /   || | /   |   | |   | (___) |      | (____)|| (____)|   | |   | || || || (__     \/  / / "
"| |( )| ||  ___  ||  ___  |   | |            | |   (_____  )         | |   |  ___  ||  __)           | | | (/ /) || (/ /) || (/ /) || (/ /) || (/ /) || (/ /) |   | |   |  ___  |      |  _____)|     __)   | |   | |(_)| ||  __)       ( (  "
"| || || || (   ) || (   ) |   | |            | |         ) |         | |   | (   ) || (              | | |   / | ||   / | ||   / | ||   / | ||   / | ||   / | |   | |   | (   ) |      | (      | (\ (      | |   | |   | || (          | |  "
"| () () || )   ( || )   ( |   | |         ___) (___/\____) |         | |   | )   ( || (____/\      __) (_|  (__) ||  (__) ||  (__) ||  (__) ||  (__) ||  (__) |   | |   | )   ( |      | )      | ) \ \_____) (___| )   ( || (____/\    (_)  "
"(_______)|/     \||/     \|   )_(         \_______/\_______)         )_(   |/     \|(_______/      \____/(_______)(_______)(_______)(_______)(_______)(_______)   )_(   |/     \|      |/       |/   \__/\_______/|/     \|(_______/     _   "
"                                                                                                                                                                                                                                        (_)  "
return "The Anser is ?"
})();

function generateChart(key,color,goal,range){
	/* 
		{
			dependencies : [ d3.js, nv.d3.js ] 
		}
	*/
	var wrap = d3.select("#chart1").selectAll("g");

	if(!! wrap[0][0]){
		d3.select("#chart1").transition().attr("class","");
		wrap.remove();
	}

	var dataset = [
		{
			values : bands(dist(goal),goal,range),
			key : key,
			color : color
		} 
	];

	nv.addGraph({
		  generate: function() {
		    var width = nv.utils.windowSize().width - 40,
		        height = nv.utils.windowSize().height - 40;

		    var chart = nv.models.historicalBar()
		        .padData(true)
		        .width(width)
		        .height(height);

		    d3.select("#chart1")
		      .attr('width', width)
		      .attr('height', height)
		      .datum(dataset)
		      .transition()
		      .attr("class","bottomUp")
		      .call(chart);

		    return chart;
		  },
		  callback: function(graph) {

		    graph.dispatch.on('elementMouseover', function(e) {
		        var offsetElement = document.getElementById("chart1"),
		                left = e.pos[0],
		                top = e.pos[1];

		        var content = '<div class="tooltip"><h2> ['+ e.point.x*range +' - '+ (e.point.x+1)*range +'] </h2><p>Count: ' + e.point.y + '</p></div>';

		        nv.tooltip.show([left, top], content, e.value < 0 ? 'n' : 's');
		    });

		    graph.dispatch.on('elementMouseout', function(e) {
		        nv.tooltip.cleanup();
		    });

		    window.onresize = function() {
		      var width = nv.utils.windowSize().width - 40,
		          height = nv.utils.windowSize().height - 40;

		      graph
		        .width(width)
		        .height(height)

		      d3.select("#chart1")
		          .attr('width', width)
		          .attr('height', height)
		        .call(graph);
		    };
		  }
	});
		

	return dataset ;
}
