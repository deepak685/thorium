let axios = require("axios")


let getStates = async function(req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function(req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function(req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function(req, res) {
    try {
        let blahhh = req.body

        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//01--assignment problem
let getDistrict = async function(req, res) {
    try {
        let districtId = req.query.districtId
        let date = req.query.date
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`
        }
        console.log(`query params are: ${districtId} ${date}`)

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    } catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

//02---assignment prolem--(a)
let weather = async function(req, res) {
        try {
            let city = req.query.city
            let temp = req.params.temp
            var options = {
                method: "get",
                url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a60e09680187b887fb61e5971c2ea0c9&temp=${temp}`
            }


            let result = await axios(options)
            console.log(result.data)
            res.status(200).send({ msg: result.data })
        } catch (err) {
            console.log(err)
            res.status(500).send({ msg: err.message })
        }
    }
    //----(b)
let sortedCities = async function(req, res) {
    try {
        let cities = ["Bangalore", "Mumbai", "London", "Delhi", "Kolkata", "Moscow", "Chennai"]
        let cityObjArr = []
        for (let i = 0; i < cities.length; i++) {
            let obj = { city: cities[i] }
            let res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&appid=a60e09680187b887fb61e5971c2ea0c9`)
            console.log(res.data.main.temp)
            obj.temp = res.data.main.temp
            cityObjArr.push(obj)
        }
        cityObjArr.sort((a, b) => { return a.temp - b.temp })
        console.log(cityObjArr)
        res.status(200).send({ data: cityObjArr })

    } catch (e) {
        res.status(500).send({ msg: e.message })
    }
}


//03--assignment
let meme = async function(req, res) {
    try {
        let memeId = req.body
        let text0 = req.body
        let text1 = req.body
        let options = {
            method: "post",
            url: `https://api.imgflip.com/caption_image?template_id =${memeId}&text0=${text0}&text1=${text1}&username=chewie12345&password=meme@123`
        }


        let result = await axios(options)
        res.status(200).send({
            data: result.data
        })
    } catch (e) {
        res.status(500).send({ msg: e.message })
    }
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.getDistrict = getDistrict
module.exports.weather = weather
module.exports.sortedCities = sortedCities
module.exports.meme = meme