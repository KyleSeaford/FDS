function openPage(pageName, elmnt, color) {
    var i, tabcontent, tablinks;
  
    // Hide all tab contents
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
  
    // Remove the "clicked" class and reset background color for all buttons
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].classList.remove("clicked");
      tablinks[i].style.backgroundColor = "";
    }
  
    // Display the selected tab content
    document.getElementById(pageName).style.display = "block";
  
    // Add the "clicked" class and set the background color for the clicked button
    elmnt.classList.add("clicked");
    elmnt.style.backgroundColor = color;
  }
  
  document.getElementById("defaultOpen").click();
  