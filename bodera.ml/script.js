            // When the user scrolls down 50px from the top of the document, resize the header's font size
            window.onscroll = () => 
            { 
                scrollFunction() 
            };

            function scrollFunction() {
                if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
                {
                    document.getElementById("header").style.fontSize = "30px";
                } else 
                {
                    document.getElementById("header").style.fontSize = "90px";
                }
            }
            function openNav() 
            { 
                document.getElementById("sidenav").style.width = "100%";
                document.getElementById("sidenav").style.opacity = "0.8";  
                document.getElementById("sidenav").style.width="250px";
                document.getElementById("site-content").style.marginLeft="250px";
                //document.getElementById("expand-sidenav").style.opacity="0";
                document.getElementById("expand-sidenav").innerHTML="&#9674;";
            }
            function closeNav() 
            {
                document.getElementById("sidenav").style.width = "0%";
                document.getElementById("sidenav").style.opacity = "0";
                document.getElementById("site-content").style.marginLeft= "0%";
                document.body.style.backgroundColor= "rgb(237, 229, 190)";
                document.getElementById("expand-sidenav").style.opacity="1";
                document.getElementById("expand-sidenav").innerHTML="&#10731;";
                //document.body.style.opacity = "0";
            }