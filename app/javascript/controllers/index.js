import { Application } from "@hotwired/stimulus"
import RailsNestedForm from '@stimulus-components/rails-nested-form'
import PreviewController from "controllers/preview_controller"
import PaletteFormController from "controllers/palette_form_controller"

const application = Application.start()

// Configure Stimulus development experience
application.debug = false
window.Stimulus   = application


application.register('nested-form', RailsNestedForm)
application.register('preview', PreviewController)
application.register('palette-form', PaletteFormController)

export { application }
