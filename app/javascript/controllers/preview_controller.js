import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { message: String }

  connect() {
    console.log("Preview controller connected with data:", this.messageValue)
  }
}
