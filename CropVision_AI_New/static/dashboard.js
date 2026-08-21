// =========================================================
// CropVision AI - Dashboard
// =========================================================

let charts = {};


// =========================================================
// CREATE CHART
// =========================================================

function createChart(
    canvasId,
    labels,
    values,
    title
) {

    const canvas =
        document.getElementById(canvasId);

    if (!canvas) {
        return;
    }


    // Destroy old chart if it exists

    if (charts[canvasId]) {

        charts[canvasId].destroy();

    }


    charts[canvasId] =
        new Chart(canvas, {

            type: "bar",

            data: {

                labels: labels,

                datasets: [

                    {
                        label: title,

                        data: values,

                        borderWidth: 1,

                        borderRadius: 8
                    }

                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {

                        display: true
                    }

                },


                scales: {

                    y: {

                        beginAtZero: true

                    }

                }

            }

        });

}


// =========================================================
// LOAD DASHBOARD DATA
// =========================================================

async function loadDashboard() {

    try {

        const response =
            await fetch(
                "/dashboard-data"
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.error ||
                "Unable to load dashboard data."
            );

        }


        // -----------------------------------------
        // STATISTICS
        // -----------------------------------------

        const records =
            document.getElementById("records");

        const crops =
            document.getElementById("crops");

        const regions =
            document.getElementById("regions");

        const averageYield =
            document.getElementById(
                "averageYield"
            );


        if (records) {

            records.textContent =
                data.records;

        }


        if (crops) {

            crops.textContent =
                data.crops;

        }


        if (regions) {

            regions.textContent =
                data.regions;

        }


        if (averageYield) {

            averageYield.textContent =
                data.average_yield;

        }


        // -----------------------------------------
        // CROP CHART
        // -----------------------------------------

        createChart(

            "cropChart",

            data.crop.labels,

            data.crop.values,

            "Average Yield"

        );


        // -----------------------------------------
        // REGION CHART
        // -----------------------------------------

        createChart(

            "regionChart",

            data.region.labels,

            data.region.values,

            "Average Yield"

        );


        // -----------------------------------------
        // SEASON CHART
        // -----------------------------------------

        createChart(

            "seasonChart",

            data.season.labels,

            data.season.values,

            "Average Yield"

        );


        // -----------------------------------------
        // IRRIGATION CHART
        // -----------------------------------------

        createChart(

            "irrigationChart",

            data.irrigation.labels,

            data.irrigation.values,

            "Average Yield"

        );


    } catch (error) {

        console.error(
            "Dashboard error:",
            error
        );


        const grid =
            document.querySelector(
                ".chart-grid"
            );


        if (grid) {

            grid.insertAdjacentHTML(

                "afterbegin",

                `
                <div
                    style="
                        grid-column: 1 / -1;
                        padding: 18px;
                        border-radius: 14px;
                        background: #fff1f1;
                        border: 1px solid #ffd0d0;
                        color: #a33;
                        text-align: center;
                        font-weight: 600;
                    "
                >
                    ⚠️ Unable to load dashboard data.
                    <br>
                    <small>
                        ${escapeHTML(error.message)}
                    </small>
                </div>
                `

            );

        }

    }

}


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
// START DASHBOARD
// =========================================================

document.addEventListener(

    "DOMContentLoaded",

    function() {

        loadDashboard();

    }

);