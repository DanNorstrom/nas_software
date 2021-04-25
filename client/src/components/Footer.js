// model adapted from public
// https://mdbootstrap.com/docs/standard/navigation/footer/

import React from "react";

const Footer = () => {

    
    return (
        
    <footer class="bg-dark text-center text-white footer-custom" style={{marginTop: '50px'}}>
        {/* import fab icons etc */}
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.8/css/all.css" integrity="sha384-3AB7yXWz4OeoZcPbieVW64vVXEwADiYyAEhwilzWsLw+9FgqpyjjStpPnpBO8o8S" crossorigin="anonymous"></link>
    <div class="container p-4">
        {/* <section class="mb-4"> */}

        


        {/* <section class=""> */}
        <div class="row d-flex justify-content-center">
            <div class="col-auto">
                <p class="pt-2">
                <a>Contact the Developer at </a> <strong>dan.norstrom@hotmail.com</strong>
                </p>     
            </div>

            <div class="col-auto">
                <button class="btn btn-outline-light mb-4" onClick={() => {navigator.clipboard.writeText("dan.norstrom@hotmail.com")}}>
                Copy Email
                </button>
            </div>

            <div class="col-auto">
            <a class="btn btn-outline-light mb-4" href="https://www.linkedin.com/in/dan-norstrom/" role="button"
            ><i class="fab fa-linkedin-in"></i
            ></a>
            </div>

            <div class="col-auto">
            <a class="btn btn-outline-light mb-4" href="https://github.com/DanNorstrom/" role="button"
            ><i class="fab fa-github"></i
            ></a>
            </div>
            
        </div>
        {/* </section> */}

        {/* <section class="mb-4">
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt distinctio earum
            repellat quaerat voluptatibus placeat nam, commodi optio pariatur est quia magnam
            eum harum corrupti dicta, aliquam sequi voluptate quas.
        </p>
        </section> */}

        {/* <section class="">
        <div class="row">
            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Links</h5>

            <ul class="list-unstyled mb-0">
                <li>
                <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 4</a>
                </li>
            </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Links</h5>

            <ul class="list-unstyled mb-0">
                <li>
                <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 4</a>
                </li>
            </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Links</h5>

            <ul class="list-unstyled mb-0">
                <li>
                <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 4</a>
                </li>
            </ul>
            </div>

            <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 class="text-uppercase">Links</h5>

            <ul class="list-unstyled mb-0">
                <li>
                <a href="#!" class="text-white">Link 1</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 2</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 3</a>
                </li>
                <li>
                <a href="#!" class="text-white">Link 4</a>
                </li>
            </ul>
            </div>
        </div>
        </section> */}
    {/* </div> */}

    {/* <div class="text-center p-3"> */}
    {/* style="background-color: rgba(0, 0, 0, 0.2);" */}
        <a class="text-white" href="https://github.com/DanNorstrom/nas_software/blob/master/LICENSE">© 2021 Copyright: Dan Åke Rune Norström - All Rights Reserved</a>
    </div>
    </footer>
    );
};

export default Footer;