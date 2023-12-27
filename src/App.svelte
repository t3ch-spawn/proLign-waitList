<script>
  import SplitType from "split-type";
  import gsap from "gsap";
  import { onMount } from "svelte";
  import logo from "./assets/logo.svg";
  import linkedIn from "./assets/linkedin.svg";
  import twitter from "./assets/twitter.svg";
  import instagram from "./assets/instagram.svg";
  import circle from "./assets/circle.png";
  import rect from "./assets/Middle-Rectangle.svg";
  import cross from "./assets/cross.svg";
  import mail from "./assets/mail.svg";
  import vectorsMobile from "./assets/vector-mobile.jpg";
  import vectors from "./assets/vector group.jpg";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { Rive } from "@rive-app/canvas";
  import lottie from "lottie-web";
  import Toastify from "toastify-js";

  import successAnimation from "./assets/https___lottiefiles.com_animations_confirmation-1WAplc448A (1).json";

  let heading;
  let ballClick;
  let ballClick2;
  let fireRocket;
  let firePreloader = function () {};
  let inputEl;
  let subscribeBtn;
  let isBtnActive = false;
  let hasSubscribed = false;
  let successAnim;
  let userMail;
  let formEl;
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);

    const r = new Rive({
      src: "../rocket.riv",
      // Or the path to a public Rive asset
      // src: '/public/example.riv',
      // @ts-ignore
      canvas: document.getElementById("canvas"),
      autoplay: true,
      stateMachines: "rocket 2",
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
        // @ts-ignore
        const inputs = r.stateMachineInputs("rocket 2");
        fireRocket = function () {
          inputs[0].fire();
        };
      },
    });

    // const heading = document.querySelector('.heading')
    let headingChars = new SplitType(".heading", { types: "words" });

    window.addEventListener("load", () => {
      const loader = new Rive({
        src: "../loader.riv",
        // Or the path to a public Rive asset
        // src: '/public/example.riv',
        // @ts-ignore
        canvas: document.getElementById("loader-canvas"),
        autoplay: true,
        stateMachines: "proLign loader",
        onLoad: () => {
          loader.resizeDrawingSurfaceToCanvas();
          // @ts-ignore
          const inputs = loader.stateMachineInputs("proLign loader");
          setTimeout(() => {
            inputs[0].fire();
          }, 2500);

          setTimeout(() => {
            loader.stop();
          }, 5000);
          // console.log("hasLoaded");
        },
        onStop: () => {
          // console.log("hi there");
          gsap.to(".loader-overlay", {
            height: 0,
            duration: 1,
            ease: "bounce.out",
            onStart: () => {
              document.querySelector("#loader-canvas").classList.add("active");
            },

            onComplete: () => {
              AnimatePage();
            },
          });
        },
      });
    });

    // LOTTIE ANIMATION
    successAnim = lottie.loadAnimation({
      container: document.querySelector(".success-animation"),
      animationData: successAnimation,
      loop: false,
      autoplay: false,
    });
  });

  function AnimatePage() {
    function rollCircle() {
      gsap.fromTo(
        ".circle",
        {
          x: 200,
          opacity: 0,
          rotate: 0,
        },
        {
          x: -100,
          opacity: 1,
          rotate: -360,
          duration: 1.8,
        }
      );
    }

    gsap
      .timeline()
      .fromTo(
        ".logo-box",
        {
          y: -200,
          opacity: 0,
        },
        {
          opacity: 1,
          y: 0,
        }
      )
      .fromTo(
        heading.querySelectorAll(".word"),
        {
          y: 100,
          opacity: 0,
        },
        {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
          ease: "power1.inOut",
          onComplete: () => {
            fireRocket();
            rollCircle();
          },
        }
      )
      .fromTo(
        ".follow-btn",
        {
          y: 200,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
        }
      )
      .fromTo(
        ".social-icon",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
        }
      )
      .fromTo(
        ".input-box",
        {
          y: 200,
          x: "-50%",
          opacity: 0,
          // scrollTrigger: {
          //   trigger: ".input-box-container",
          //   markers: true,
          //   start: "bottom 83%",
          // },
        },
        {
          opacity: 1,
          y: 0,
          x: "-50%",
          stagger: 0.3,
          onComplete: () => {
            document
              .querySelectorAll(".input-box")
              .forEach((inp) => inp.classList.add("shifted"));
          },
        }
      );
  }

  function toggleSuccess() {
    hasSubscribed = !hasSubscribed;
    if (!hasSubscribed) {
      successAnim.setDirection(-1);
      successAnim.play();
    }
  }

  function subscribeUser(e) {
    // Function that creates toastify message
    function createToastify(message) {
      let time = 2000;
      Toastify({
        text: message,
        className: "toastify-note",
        duration: time,
        stopOnFocus: false,
        // @ts-ignore
      }).showToast();
      const loadingBar = document.createElement("div");
      loadingBar.classList.add("toasty-loadingBar");
      document.querySelector(".toastify-note").appendChild(loadingBar);
      setTimeout(() => {
        loadingBar.style.width = "0%";
      }, 500);
    }
    e.preventDefault();

    if (inputEl.value.trim() == "") {
      createToastify("Please enter your mail!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(inputEl.value.trim())) {
      userMail = inputEl.value.trim();
      hasSubscribed = true;
      successAnim.setDirection(1);
      successAnim.play();
      inputEl.value = "";
    } else {
      createToastify("Please enter a valid mail!");
    }
  }
</script>

<main class="relative">
  <!-- Container for the loader -->
  <section
    class="loader-overlay fixed w-full h-full left-0 top-0 bg-primOrange z-40 flex flex-col justify-center items-center"
  >
    <canvas
      class="max-w-[500px] -500:max-w-[300px]"
      id="loader-canvas"
      height="500"
      width="500"
    ></canvas>
  </section>

  <!-- overlay that pops up when success comes up -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click={toggleSuccess}
    class:active={hasSubscribed}
    class="overlay z-[25] fixed w-full h-full top-0 left-0 bg-overlay opacity-0 pointer-events-none"
  ></div>

  <!-- Container for pop up when the user signs up -->
  <section
    class:active={hasSubscribed}
    class="success-container opacity-0 pointer-events-none flex flex-col justify-center items-center text-center fixed gap-[30px] z-30 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] max-w-[600px] w-[90%] bg-white p-8 rounded-md"
  >
    <!-- Cross btn -->
    <button on:click={toggleSuccess} class="absolute top-4 right-4"
      ><img src={cross} alt="" /></button
    >

    <!-- container for lottie success animation -->
    <div class="success-animation max-w-[300px]"></div>

    <!-- Typography -->
    <h2
      class="font-cascadiaMono text-3xl -500:text-2xl font-semibold max-w-[400px]"
    >
      We've added you to our waiting list
    </h2>
    <p class="font-franklinGoth">We’ll let you when prolign is ready.</p>

    <!-- Container for div that shows the email -->
    <div
      class="bg-lightOrange flex justify-center items-center w-full h-[80px] rounded-[5px]"
    >
      <div
        class="bg-white w-[90%] h-[50%] rounded-[5px] flex justify-start items-center gap-2 px-4"
      >
        <img class="h-[80%]" src={mail} alt="" />
        <p class="font-franklinGoth">{userMail}</p>
      </div>
    </div>
  </section>

  <!-- Background image that has the stars and the lines -->
  <img
    src={vectors}
    class="absolute top-0 left-0 w-full h-full -500:hidden"
    alt=""
  />
  <img
    src={vectorsMobile}
    class="absolute top-0 left-0 w-full h-full hidden -500:block"
    alt=""
  />

  <!-- Container for logo and text -->
  <div class="logo-box opacity-0 flex flex-col justify-center items-center">
    <img src={logo} class="w-[80px]" alt="" />
  </div>
  <div
    class="w-full flex flex-col justify-center items-center pb-10 overflow-hidden relative"
  >
    <!-- Rectangle vector that kinda fades in from the heading -->
    <img
      class="h-[60%] w-[90%] -850:w-[98%] -850:h-[80%] left-[50%] translate-x-[-50%] absolute top-0"
      src={rect}
      alt=""
    />
    <h1
      bind:this={heading}
      class="z-20 heading relative font-cascadiaMono heading text-4xl -950:text-3xl -500:text-2xl text-center max-w-[700px] font-normal"
    >
      Unlock productivity, elevate projects, and turbocharge team collaboration

      <!-- Circle image -->
      <img
        class="circle absolute right-[-300px] top-[-10px] w-[120px] -1100:right-[-250px] -1000:right-[-150px] -1000:top-[100px] opacity-0 -800:hidden"
        src={circle}
        alt=""
      />

      <!-- Canvas for the rocket -->
      <canvas
        class="mx-auto absolute top-[-200px] h-[500px] w-[500px] left-[-380px] -1100:left-[-350px] -1000:left-[-200px] -1000:top-[-100px] z-[-10] max-w-[500px] -800:opacity-0 -800:pointer-events-none"
        id="canvas"
      ></canvas>
    </h1>

    <!-- Container for button and social icons -->
    <div class="w-full flex flex-col gap-16 items-center overflow-hidden">
      <button
        class="follow-btn opacity-0 font-franklinGoth bg-black border-black border-[1px] p-3 px-6 rounded-md text-white hover:bg-white hover:text-primOrange hover:border-[1px] hover:border-primOrange"
        >Follow us</button
      >

      <!--container for social icons -->
      <div class="flex gap-4 items-center justify-center">
        <img
          class="social-icon opacity-0 cursor-pointer"
          src={linkedIn}
          alt=""
        />
        <img
          class="social-icon opacity-0 cursor-pointer"
          src={twitter}
          alt=""
        />
        <img
          class="social-icon opacity-0 cursor-pointer"
          src={instagram}
          alt=""
        />
      </div>
    </div>

    <!-- Container for input boxes-->
    <div
      class="input-box-container relative w-[90%] -950:w-[95%] mb-24 max-w-[800px] h-[200px] -950:h-[250px] -500:h-[300px]"
    >
      <!-- first input box -->
      <div
        class="input-box absolute border-black border-2 h-full bg-white rounded-2xl w-[70%] -500:w-[75%] mt-[0px]"
      ></div>

      <!-- second input box -->
      <div
        class="input-box absolute border-black border-2 h-full bg-white rounded-2xl w-[88%] -500:w-[90%] mt-[20px] -500:mt-[10px]"
      ></div>

      <!-- third input box -->
      <div
        class="input-box absolute border-black border-2 h-full bg-white rounded-2xl w-[100%] mt-[40px] -500:mt-[20px] flex flex-col items-start justify-center p-8 -500:px-5 gap-6 -850:items-center -850:text-center"
      >
        <!-- COntainer for typography -->
        <div>
          <h3 class="font-semibold text-xl mb-2 font-cascadiaMono">
            Join the waitlist
          </h3>
          <p class="font-franklinGoth font-medium">
            Sign up to be the first to receive an email when it is launched
          </p>
        </div>
        <!-- Form for the input and the button -->
        <form
          class="w-full gap-6 flex items-center justify-start flex-wrap -850:justify-center"
          bind:this={formEl}
        >
          <input
            bind:this={inputEl}
            type="email"
            required
            class="inputEl font-grotesk border-black border-[1px] rounded-xl p-3 px-6 w-full max-w-[550px]"
            placeholder="steven@gmail.com"
          />
          <button
            on:click={subscribeUser}
            class:active={isBtnActive}
            bind:this={subscribeBtn}
            class="subscribe-btn bg-lightOrange border-primOrange border-[1px] text-primOrange p-3 px-5 rounded-xl font-bold hover:bg-lightOrange hover:text-primOrange hover:bg-white duration-300"
            >Subscribe</button
          >
        </form>
      </div>
    </div>

    <p class="mx-auto font-cascadiaMono font-normal">
      ProLign is coming soon !
    </p>
  </div>
</main>

<style>
  .success-container,
  .overlay {
    transition: 0.3s;
  }

  .success-container.active {
    opacity: 1;
    pointer-events: all;
  }

  .overlay.active {
    opacity: 1;
    pointer-events: all;
  }
</style>
