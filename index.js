(() => {
    document.addEventListener('DOMContentLoaded', async () => {
        const response = await fetch('/Expenses-Chart-Component/assets/data.json');
        const data = await response.json();

        const barDocumentFragment = new DocumentFragment();
        const labelDocumentFragment = new DocumentFragment();

        const barsContainer = document.querySelector('#bars-container');
        const labelsContainer = document.querySelector('#labels-container');

        const maxAmount = Math.max(...data.map(item => item.amount));

        data.forEach(item => {
            const { day, amount } = item;

            handleAddDayLabel(day, labelDocumentFragment);
            handleAddBar(amount, maxAmount, barDocumentFragment);
        });

        barsContainer.append(barDocumentFragment);
        labelsContainer.append(labelDocumentFragment);
    });

    const handleAddDayLabel = (day, labelDocumentFragment) => {
        const labelElement = document.createElement('span');

        labelElement.textContent = day;
        labelElement.classList.add('label');

        labelDocumentFragment.append(labelElement);
    };

    const handleAddBar = (amount, maxAmount, barDocumentFragment) => {
        const barElement = document.createElement('span');
        const tooltipElement = document.createElement('span');

        barElement.style.height = `${getBarHeight(amount, maxAmount)}px`;
        barElement.classList.add('bar');

        tooltipElement.textContent = `$${amount}`;
        tooltipElement.classList.add('tooltip');

        barElement.append(tooltipElement);

        if (maxAmount === amount) {
            barElement.classList.add('bar--highest');
        }

        barDocumentFragment.append(barElement);
    };

    const getBarHeight = (amount, maxAmount) => {
        // 150 is max bar height
        const ratio = 150 / maxAmount;

        return amount * ratio;
    };
})();