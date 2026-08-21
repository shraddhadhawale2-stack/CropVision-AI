// =========================================================
// CropVision AI - Smart Agricultural Assistant
// =========================================================


// =========================================================
// ELEMENTS
// =========================================================

const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const sendButton = document.getElementById("sendButton");


// =========================================================
// ADD MESSAGE
// =========================================================

function addMessage(text, type) {

    const message = document.createElement("div");

    message.className = "message " + type;

    message.innerHTML = text;

    chatMessages.appendChild(message);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    return message;
}


// =========================================================
// THINKING ANIMATION
// =========================================================

function showThinking() {

    const thinking = document.createElement("div");

    thinking.className = "message bot";

    thinking.innerHTML = `
        <div class="thinking">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatMessages.appendChild(thinking);

    chatMessages.scrollTop =
        chatMessages.scrollHeight;

    return thinking;
}


// =========================================================
// AI RESPONSE
// =========================================================

function generateResponse(question) {

    const q = question.toLowerCase().trim();


    // -----------------------------------------
    // GREETING
    // -----------------------------------------

    if (
        q.includes("hello") ||
        q.includes("hi") ||
        q.includes("hey") ||
        q.includes("namaste")
    ) {

        return `
            👋 <b>Hello!</b>

            <br><br>

            I am your <b>CropVision AI Assistant</b>.

            <br><br>

            You can ask me about:

            <br>🌾 Crop Yield
            <br>🌱 Soil
            <br>💧 Irrigation
            <br>🌧️ Rainfall
            <br>🧪 Fertilizer
            <br>🌡️ Temperature
            <br>🚜 Farming
        `;
    }


    // -----------------------------------------
    // CROP YIELD
    // -----------------------------------------

    if (
        q.includes("yield") ||
        q.includes("production") ||
        q.includes("crop yield") ||
        q.includes("increase yield") ||
        q.includes("improve yield")
    ) {

        return `
            🌾 <b>Crop Yield Advice</b>

            <br><br>

            Crop yield depends on several factors such as:

            <br>🌱 Soil quality
            <br>🌧️ Rainfall
            <br>💧 Irrigation
            <br>🌡️ Temperature
            <br>🧪 Fertilizer
            <br>☀️ Sunshine

            <br><br>

            For better crop yield, maintain suitable
            irrigation, monitor soil nutrients and use
            fertilizers according to soil requirements.
        `;
    }


    // -----------------------------------------
    // IRRIGATION
    // -----------------------------------------

    if (
        q.includes("irrigation") ||
        q.includes("water") ||
        q.includes("watering")
    ) {

        return `
            💧 <b>Irrigation Advice</b>

            <br><br>

            Irrigation provides crops with the water
            required for healthy growth.

            <br><br>

            The amount of water required depends on:

            <br>🌱 Crop type
            <br>🌍 Soil condition
            <br>🌡️ Temperature
            <br>🌧️ Rainfall

            <br><br>

            Avoid both over-irrigation and water stress.
        `;
    }


    // -----------------------------------------
    // RAINFALL
    // -----------------------------------------

    if (
        q.includes("rain") ||
        q.includes("rainfall") ||
        q.includes("weather")
    ) {

        return `
            🌧️ <b>Rainfall & Farming</b>

            <br><br>

            Rainfall affects crop growth and irrigation
            requirements.

            <br><br>

            Adequate rainfall can support crop growth,
            while excessive rainfall may cause
            waterlogging.

            <br><br>

            Proper field drainage is important during
            heavy rainfall.
        `;
    }


    // -----------------------------------------
    // SOIL
    // -----------------------------------------

    if (
        q.includes("soil") ||
        q.includes("fertility") ||
        q.includes("soil type") ||
        q.includes("soil quality")
    ) {

        return `
            🌱 <b>Soil Advice</b>

            <br><br>

            Healthy soil should have suitable:

            <br>• Nutrient levels
            <br>• Moisture
            <br>• pH
            <br>• Drainage

            <br><br>

            Regular soil testing can help identify
            nutrient requirements.
        `;
    }


    // -----------------------------------------
    // SOIL pH
    // -----------------------------------------

    if (
        q.includes("ph") ||
        q.includes("soil ph")
    ) {

        return `
            🌱 <b>Soil pH</b>

            <br><br>

            Soil pH indicates how acidic or alkaline
            the soil is.

            <br><br>

            Different crops grow well under different
            soil pH conditions.

            <br><br>

            Soil testing can help determine the
            appropriate soil management.
        `;
    }


    // -----------------------------------------
    // FERTILIZER
    // -----------------------------------------

    if (
        q.includes("fertilizer") ||
        q.includes("fertiliser") ||
        q.includes("npk") ||
        q.includes("nitrogen") ||
        q.includes("phosphorus") ||
        q.includes("potassium")
    ) {

        return `
            🧪 <b>Fertilizer Advice</b>

            <br><br>

            NPK represents:

            <br>🟢 <b>N</b> - Nitrogen
            <br>🟡 <b>P</b> - Phosphorus
            <br>🔵 <b>K</b> - Potassium

            <br><br>

            These nutrients support different aspects
            of plant growth.

            <br><br>

            The appropriate fertilizer quantity depends
            on crop requirements and soil nutrient levels.
        `;
    }


    // -----------------------------------------
    // TEMPERATURE
    // -----------------------------------------

    if (
        q.includes("temperature") ||
        q.includes("heat") ||
        q.includes("hot")
    ) {

        return `
            🌡️ <b>Temperature & Crops</b>

            <br><br>

            Temperature affects crop growth,
            flowering and overall development.

            <br><br>

            Different crops have different suitable
            temperature ranges.

            <br><br>

            Monitoring temperature can help with
            better crop management.
        `;
    }


    // -----------------------------------------
    // SUNSHINE
    // -----------------------------------------

    if (
        q.includes("sunshine") ||
        q.includes("sunlight") ||
        q.includes("sun")
    ) {

        return `
            ☀️ <b>Sunshine & Crop Growth</b>

            <br><br>

            Sunlight provides energy required for
            photosynthesis.

            <br><br>

            Adequate sunshine supports healthy plant
            growth and crop development.
        `;
    }


    // -----------------------------------------
    // FARMING
    // -----------------------------------------

    if (
        q.includes("farming") ||
        q.includes("farmer") ||
        q.includes("agriculture")
    ) {

        return `
            🚜 <b>Smart Farming</b>

            <br><br>

            Smart farming uses agricultural data
            to support better decisions.

            <br><br>

            Important factors include:

            <br>🌱 Soil
            <br>🌧️ Rainfall
            <br>💧 Irrigation
            <br>🌡️ Temperature
            <br>🧪 Nutrients
            <br>🌾 Crop type
        `;
    }


    // -----------------------------------------
    // DEFAULT
    // -----------------------------------------

    return `
        🤖 <b>CropVision AI Assistant</b>

        <br><br>

        I can currently help with agricultural
        topics such as:

        <br><br>

        🌾 Crop Yield
        <br>🌱 Soil
        <br>💧 Irrigation
        <br>🌧️ Rainfall
        <br>🧪 Fertilizer
        <br>🌡️ Temperature
        <br>☀️ Sunshine
        <br>🚜 Farming

        <br><br>

        Try asking something like:
        <br>
        <b>"How can I improve crop yield?"</b>
    `;
}


// =========================================================
// SEND MESSAGE
// =========================================================

function sendMessage() {

    const question =
        userInput.value.trim();


    if (!question) {
        return;
    }


    // User message

    addMessage(
        "👤 " + escapeHTML(question),
        "user"
    );


    // Clear input

    userInput.value = "";


    // Disable input

    sendButton.disabled = true;

    userInput.disabled = true;


    // Show thinking

    const thinking =
        showThinking();


    // Simulated AI response delay

    const delay =
        900 +
        Math.floor(Math.random() * 900);


    setTimeout(function() {

        thinking.remove();


        const answer =
            generateResponse(question);


        addMessage(
            answer,
            "bot"
        );


        // Enable input

        sendButton.disabled = false;

        userInput.disabled = false;

        userInput.focus();

    }, delay);
}


// =========================================================
// QUICK QUESTIONS
// =========================================================

function askQuestion(question) {

    userInput.value =
        question;

    sendMessage();
}


// =========================================================
// ENTER KEY
// =========================================================

userInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            sendMessage();
        }

    }
);


// =========================================================
// ESCAPE HTML
// =========================================================

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent =
        text;

    return div.innerHTML;
}


// =========================================================
// DARK / LIGHT MODE
// =========================================================

const themeToggle =
    document.getElementById("themeToggle");


if (themeToggle) {

    const savedTheme =
        localStorage.getItem(
            "cropvision-theme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeToggle.textContent =
            "☀️";
    }


    themeToggle.addEventListener(
        "click",
        function() {

            document.body.classList.toggle(
                "dark"
            );


            if (
                document.body.classList.contains(
                    "dark"
                )
            ) {

                themeToggle.textContent =
                    "☀️";

                localStorage.setItem(
                    "cropvision-theme",
                    "dark"
                );

            } else {

                themeToggle.textContent =
                    "🌙";

                localStorage.setItem(
                    "cropvision-theme",
                    "light"
                );
            }

        }
    );

}