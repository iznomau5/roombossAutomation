export const happyPathSchema = {
  "type": "object",
  "properties": {
    "apiVersion": {
      "type": "string"
    },
    "success": {
      "type": "boolean"
    },
    "failureMessage": {
      "type": "null"
    },
    "posId": {
      "type": "string"
    },
    "checkIn": {
      "type": "string"
    },
    "checkOut": {
      "type": "string"
    },
    "numberGuests": {
      "type": "integer"
    },
    "availableHotels": {
      "type": "array",
      "items": [
        {
          "type": "object",
          "properties": {
            "url": {
              "type": "string"
            },
            "vendorType": {
              "type": "string"
            },
            "countryCode": {
              "type": "string"
            },
            "locationCode": {
              "type": "string"
            },
            "latitude": {
              "type": "number"
            },
            "longitude": {
              "type": "number"
            },
            "currencyCode": {
              "type": "string"
            },
            "hotelId": {
              "type": "string"
            },
            "hotelName": {
              "type": "string"
            },
            "hotelUrl": {
              "type": "string"
            },
            "internalInventory": {
              "type": "boolean"
            },
            "posManaged": {
              "type": "boolean"
            },
            "recordGuestType": {
              "type": "boolean"
            },
            "maxAgeChildren": {
              "type": "integer"
            },
            "maxAgeInfants": {
              "type": "integer"
            },
            "roomTypes": {
              "type": "array",
              "items": [
                {
                  "type": "object",
                  "properties": {
                    "roomTypeId": {
                      "type": "string"
                    },
                    "roomTypeName": {
                      "type": "string"
                    },
                    "maxNumberGuests": {
                      "type": "integer"
                    },
                    "numberBedrooms": {
                      "type": "integer"
                    },
                    "numberBathrooms": {
                      "type": "integer"
                    },
                    "maxNumberAdults": {
                      "type": "integer"
                    },
                    "maxNumberChildren": {
                      "type": "integer"
                    },
                    "maxNumberInfants": {
                      "type": "integer"
                    },
                    "available": {
                      "type": "integer"
                    },
                    "unAvailableRatePlans": {
                      "type": "array",
                      "items": [
                        {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer"
                            },
                            "minLos": {
                              "type": "null"
                            },
                            "maxLos": {
                              "type": "null"
                            },
                            "minAdv": {
                              "type": "integer"
                            },
                            "maxAdv": {
                              "type": "null"
                            },
                            "closed": {
                              "type": "null"
                            },
                            "closedToArrival": {
                              "type": "null"
                            },
                            "closedToDeparture": {
                              "type": "null"
                            }
                          },
                          "required": [
                            "id",
                            "minLos",
                            "maxLos",
                            "minAdv",
                            "maxAdv",
                            "closed",
                            "closedToArrival",
                            "closedToDeparture"
                          ]
                        }
                      ]
                    }
                  },
                  "required": [
                    "roomTypeId",
                    "roomTypeName",
                    "maxNumberGuests",
                    "numberBedrooms",
                    "numberBathrooms",
                    "maxNumberAdults",
                    "maxNumberChildren",
                    "maxNumberInfants",
                    "available",
                    "unAvailableRatePlans"
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "roomTypeId": {
                      "type": "string"
                    },
                    "roomTypeName": {
                      "type": "string"
                    },
                    "maxNumberGuests": {
                      "type": "integer"
                    },
                    "numberBedrooms": {
                      "type": "integer"
                    },
                    "numberBathrooms": {
                      "type": "integer"
                    },
                    "maxNumberAdults": {
                      "type": "integer"
                    },
                    "maxNumberChildren": {
                      "type": "integer"
                    },
                    "maxNumberInfants": {
                      "type": "integer"
                    },
                    "available": {
                      "type": "integer"
                    },
                    "unAvailableRatePlans": {
                      "type": "array",
                      "items": [
                        {
                          "type": "object",
                          "properties": {
                            "id": {
                              "type": "integer"
                            },
                            "minLos": {
                              "type": "null"
                            },
                            "maxLos": {
                              "type": "null"
                            },
                            "minAdv": {
                              "type": "integer"
                            },
                            "maxAdv": {
                              "type": "null"
                            },
                            "closed": {
                              "type": "null"
                            },
                            "closedToArrival": {
                              "type": "null"
                            },
                            "closedToDeparture": {
                              "type": "null"
                            }
                          },
                          "required": [
                            "id",
                            "minLos",
                            "maxLos",
                            "minAdv",
                            "maxAdv",
                            "closed",
                            "closedToArrival",
                            "closedToDeparture"
                          ]
                        }
                      ]
                    }
                  },
                  "required": [
                    "roomTypeId",
                    "roomTypeName",
                    "maxNumberGuests",
                    "numberBedrooms",
                    "numberBathrooms",
                    "maxNumberAdults",
                    "maxNumberChildren",
                    "maxNumberInfants",
                    "available",
                    "unAvailableRatePlans"
                  ]
                }
              ]
            },
            "bookingPermission": {
              "type": "string"
            },
            "availableRoomTypes": {
              "type": "array",
              "items": [
                {
                  "type": "object",
                  "properties": {
                    "roomTypeId": {
                      "type": "string"
                    },
                    "roomTypeName": {
                      "type": "string"
                    },
                    "maxNumberGuests": {
                      "type": "integer"
                    },
                    "numberBedrooms": {
                      "type": "integer"
                    },
                    "numberBathrooms": {
                      "type": "integer"
                    },
                    "maxNumberAdults": {
                      "type": "integer"
                    },
                    "maxNumberChildren": {
                      "type": "integer"
                    },
                    "maxNumberInfants": {
                      "type": "integer"
                    },
                    "quantityAvailable": {
                      "type": "integer"
                    },
                    "priceNumberGuests": {
                      "type": "integer"
                    },
                    "minNights": {
                      "type": "integer"
                    },
                    "ratePlan": {
                      "type": "object",
                      "properties": {
                        "ratePlanId": {
                          "type": "integer"
                        },
                        "priceRetail": {
                          "type": "number"
                        },
                        "mealsIncluded": {
                          "type": "boolean"
                        },
                        "breakfast": {
                          "type": "boolean"
                        },
                        "lunch": {
                          "type": "boolean"
                        },
                        "dinner": {
                          "type": "boolean"
                        },
                        "rateRestrictionIgnored": {
                          "type": "boolean"
                        }
                      },
                      "required": [
                        "ratePlanId",
                        "priceRetail",
                        "mealsIncluded",
                        "breakfast",
                        "lunch",
                        "dinner",
                        "rateRestrictionIgnored"
                      ]
                    }
                  },
                  "required": [
                    "roomTypeId",
                    "roomTypeName",
                    "maxNumberGuests",
                    "numberBedrooms",
                    "numberBathrooms",
                    "maxNumberAdults",
                    "maxNumberChildren",
                    "maxNumberInfants",
                    "quantityAvailable",
                    "priceNumberGuests",
                    "minNights",
                    "ratePlan"
                  ]
                },
                {
                  "type": "object",
                  "properties": {
                    "roomTypeId": {
                      "type": "string"
                    },
                    "roomTypeName": {
                      "type": "string"
                    },
                    "maxNumberGuests": {
                      "type": "integer"
                    },
                    "numberBedrooms": {
                      "type": "integer"
                    },
                    "numberBathrooms": {
                      "type": "integer"
                    },
                    "maxNumberAdults": {
                      "type": "integer"
                    },
                    "maxNumberChildren": {
                      "type": "integer"
                    },
                    "maxNumberInfants": {
                      "type": "integer"
                    },
                    "quantityAvailable": {
                      "type": "integer"
                    },
                    "priceNumberGuests": {
                      "type": "integer"
                    },
                    "minNights": {
                      "type": "integer"
                    },
                    "ratePlan": {
                      "type": "object",
                      "properties": {
                        "ratePlanId": {
                          "type": "integer"
                        },
                        "priceRetail": {
                          "type": "number"
                        },
                        "mealsIncluded": {
                          "type": "boolean"
                        },
                        "breakfast": {
                          "type": "boolean"
                        },
                        "lunch": {
                          "type": "boolean"
                        },
                        "dinner": {
                          "type": "boolean"
                        },
                        "rateRestrictionIgnored": {
                          "type": "boolean"
                        }
                      },
                      "required": [
                        "ratePlanId",
                        "priceRetail",
                        "mealsIncluded",
                        "breakfast",
                        "lunch",
                        "dinner",
                        "rateRestrictionIgnored"
                      ]
                    }
                  },
                  "required": [
                    "roomTypeId",
                    "roomTypeName",
                    "maxNumberGuests",
                    "numberBedrooms",
                    "numberBathrooms",
                    "maxNumberAdults",
                    "maxNumberChildren",
                    "maxNumberInfants",
                    "quantityAvailable",
                    "priceNumberGuests",
                    "minNights",
                    "ratePlan"
                  ]
                }
              ]
            },
            "bookAndPayEnabled": {
              "type": "boolean"
            },
            "hideRequestIfBookAndPayEnabled": {
              "type": "boolean"
            },
            "widgetBookAndPayEnabled": {
              "type": "boolean"
            }
          },
          "required": [
            "url",
            "vendorType",
            "countryCode",
            "locationCode",
            "latitude",
            "longitude",
            "currencyCode",
            "hotelId",
            "hotelName",
            "hotelUrl",
            "internalInventory",
            "posManaged",
            "recordGuestType",
            "maxAgeChildren",
            "maxAgeInfants",
            "roomTypes",
            "bookingPermission",
            "availableRoomTypes",
            "bookAndPayEnabled",
            "hideRequestIfBookAndPayEnabled",
            "widgetBookAndPayEnabled"
          ]
        }
      ]
    }
  },
  "required": [
    "apiVersion",
    "success",
    "failureMessage",
    "posId",
    "checkIn",
    "checkOut",
    "numberGuests",
    "availableHotels"
  ]
}

export const notFoundSchema = {
  "type": "object",
  "properties": {
    "statusCode": {
      "type": "integer"
    },
    "errorMessage": {
      "type": "string"
    }
  },
  "required": [
    "statusCode",
    "errorMessage"
  ]
}