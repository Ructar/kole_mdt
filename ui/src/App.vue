<template>
  <component :if="show" :is="device"></component>
</template>

<script>
import phone from "@/components/Phone.vue";
import tablet from "@/components/Tablet.vue";
import { mapState } from "vuex";

export default {
  name: "app",
  components: {
    phone,
    tablet,
  },
  data: () => ({}),
  computed: {
    ...mapState(["show", "device"]),
  },
  mounted: function () {
    window.addEventListener("message", this.onMessage);
  },
  methods: {
    onMessage: function (event) {
      var data = event.data;
      if (!data) {
        return;
      }
      // Do something.
    },
    post: function (method, payload) {
      if (this.debug) {
        return;
      }

      fetch(`https://${this.resource}//${method}`, {
        body: JSON.stringify(payload),
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      })
        .then((resp) => resp.json())
        .then((resp) => console.log(resp));
    },
  },
};
</script>


<style lang="scss">
@font-face {
  font-family: "Open Sans";
  font-style: normal;
  font-weight: normal;
  src: url("./assets/fonts/OpenSans-Regular.ttf");
}

#webpack-deq-server-client-overlay {
  display: none;
}

#webpack-deq-server-client-overlay {
  display: none;
}

#webpack-deq-server-client-overlay {
  display: none;
}

.overflow {
  overflow-y: auto;
}

::-webkit-scrollbar {
  display: none;
}

.scroll-bar::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

.scroll-bar::-webkit-scrollbar {
  display: block;
  height: 6px;
  width: 6px;
  background-color: #f5f5f5;
}

.scroll-bar::-webkit-scrollbar-thumb {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #555;
}

.phone,
.tablet {
  position: absolute;
  bottom: 10px;
  right: 10px;
  display: block;
  margin: auto;
  border: 0.5px solid rgba(255, 255, 255, 0.7);
  border-style: outset;
  background-color: #121212;
  width: 1200px;
  height: 781px;
  border-radius: 25px;
  padding: 4px 4px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); // shit shadow
  transition: 0.75s all ease-in-out;
  .screen {
    position: relative;
    display: block;
    background-image: url("./assets/images/galaxybg.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
    border-radius: 19px;
    overflow: hidden;

    &:after {
      content: "";
      width: 30px;
      height: 100%;
      background: rgba(255, 255, 255, 0);
      position: absolute;
      left: 0px;
      pointer-events: none;
    }

    .notch {
      width: 15px;
      height: 15px;
      background: black;
      margin: auto;
      position: absolute;
      right: 15px;
      top: 10px;
      border-radius: 10px;
      z-index: 10;
    }

    .left-glare,
    .right-glare {
      position: absolute;
      left: 0px;
      width: 12.6px;
      height: 100%;
      opacity: 0.75;
      background-image: linear-gradient(to right, #9e9e9e, transparent);
      border-radius: 70px 0 0 70px;
      z-index: 4;
    }

    .right-glare {
      right: 0;
      left: auto;
      background-image: linear-gradient(to left, #9e9e9e, transparent);
      border-radius: 0 70px 70px 0;
    }
  }
}
.tablet {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 1200px;
  height: 781px;
}
</style>