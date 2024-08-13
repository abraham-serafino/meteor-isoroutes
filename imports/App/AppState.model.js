import { Mongo } from "meteor/mongo"
import Joi from "joi"
import useMeteorSubscription from "/imports/Common/useMeteorSubscription"
import { ValidatedMethod } from "/imports/Common/ValidatedMethod"

const APP_STATE = {
  COLLECTION: "appstate",
  CHANGE_SEX: "AppState.changeSex",
  INCREMENT_COUNT: "AppState.incrementCount"
}

const AppState = new Mongo.Collection(APP_STATE.COLLECTION)

if (Meteor.isServer) {
  Meteor.startup(async () => {
    const result = await AppState.find().fetch()

    if (!result?.length) {
      AppState.insert({ title: "Character Counter", count: 0, sex: "m" })
    }
  })

  Meteor.publish(APP_STATE.COLLECTION, () => {
    return AppState.find()
  })
} else {
  Meteor.subscribe(APP_STATE.COLLECTION)
}

const changeSexSchema = Joi.object({
  sex: Joi.string().valid('m').valid('f').required(),
})

const AppStateModel = {
  subscribe() {
    return useMeteorSubscription({
      Collection: AppState,
      subscriptionName: APP_STATE.COLLECTION,
      findOne: true
    })
  },

  changeSex: ValidatedMethod(
    APP_STATE.CHANGE_SEX,
     ({ sex }) => {
      AppState.update({}, { $set: { sex }})
    },
    changeSexSchema
  ),

  incrementCount: ValidatedMethod(
      APP_STATE.INCREMENT_COUNT,
      () => {
        AppState.update({}, { $inc: { count: 1 }})
      }
  ),
}

export { APP_STATE, AppState, changeSexSchema }
export default AppStateModel
