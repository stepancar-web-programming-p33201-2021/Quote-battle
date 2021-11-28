import React, { useState, useEffect } from 'react';

import './OfferForm.css';
const maxlength=200;

const OfferForm = (props) => {
    
	return (
	<div className="OfferFrom">
        <form>
            <h3>Цитата</h3>
            <textarea name="text" placeholder = "Напишите здесь..." maxlength={maxlength} rows="5"/>
            <p>Максимальная длина цитаты составляет {maxlength} символов</p>
            <h3>Категория</h3>
            <select name="type">
                <option value="0">Самурайская</option>
                <option value="1">Волчья</option>
                <option value="2">Ковбойская</option>
                <option value="3">Пацанская</option>
            </select>
            <input type="submit" value="Предложить цитату"/>
        </form>
	</div>
    )
}

export default OfferForm;
