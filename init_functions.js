function initSquares()
{
	itemSpots = {}
   	var i;
   	for(i = 0; i < 1; i++)
   	{
   		var elm = document.createElement("spot"+i);
   		var body = document.getElementById("body");
   		body.appendChild(elm);

   		itemSpots[i] = new itemSpot();

   		elm.img = "Images/receptacle.png";
   		elm.addEventListener('mouseenter', scale(1,1));
   		elm.addEventListener('mouseleave', scale(0.5,0.5));
   	}
}