export const happyPathSchema = {
  "type": "object",
  "properties": {
    "apiVersion": {
      "type": "string"
    },
    "hotels": {
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
                "items": {
                "type": "object",
                "properties": {
                  "roomTypeId": { "type": "string" },
                  "roomTypeName": { "type": "string" },
                  "maxNumberGuests": { "type": "integer" },
                  "numberBedrooms": { "type": "integer" },
                  "numberBathrooms": { "type": "integer" },
                  "maxNumberAdults": { "type": "integer" },
                  "maxNumberChildren": { "type": "integer" },
                  "maxNumberInfants": { "type": "integer" },
                  "unAvailableRatePlans": {
                    "type": "array",
                    "items": {}
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
                  "unAvailableRatePlans"
                ]
  }
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
            "roomTypes"
          ]
        }
      ]
    }
  },
  "required": [
    "apiVersion",
    "hotels"
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