const form = document.getElementById("predictionForm");

if (form) {

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        const button =
            document.getElementById("predictBtn");

        const resultCard =
            document.getElementById("resultCard");

        const predictionValue =
            document.getElementById("predictionValue");

        const predictionCategory =
            document.getElementById("predictionCategory");

        const predictionInsight =
            document.getElementById("predictionInsight");


        button.disabled = true;

        button.textContent =
            "⏳ Predicting...";


        const formData =
            new FormData(form);

        const data =
            Object.fromEntries(
                formData.entries()
            );


        try {

            const response =
                await fetch(
                    "/predict",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(data)
                    }
                );


            const result =
                await response.json();


            if (!response.ok ||
                !result.success) {

                throw new Error(
                    result.error ||
                    "Prediction failed."
                );
            }


            predictionValue.textContent =
                result.prediction;


            predictionCategory.textContent =
                result.category;


            predictionInsight.textContent =
                result.insight;


            resultCard.style.display =
                "block";


            /*
             * Save latest prediction so the
             * AI Assistant can use it.
             */

            localStorage.setItem(
                "cropVisionPrediction",
                JSON.stringify({
                    prediction:
                        result.prediction,

                    category:
                        result.category,

                    context:
                        result.context
                })
            );


            resultCard.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });


        } catch (error) {

            alert(
                "❌ " +
                error.message
            );

            console.error(error);

        } finally {

            button.disabled = false;

            button.textContent =
                "🌱 Predict Crop Yield";
        }

    });

}