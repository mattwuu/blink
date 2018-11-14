import { HTTP } from "../utils/http.js";

class ClassicModel extends HTTP {
  getLatest(sCallback) {
    this.request({
      url: "classic/latest",
      success: resp => {
        sCallback(resp);
      }
    });
  }

  getPrevious(index, sCallback) {
    this.request({
      url: "classic/" + index + "/previous",
      success: resp => {
        sCallback(resp);
      }
    });
  }
}

export { ClassicModel };
