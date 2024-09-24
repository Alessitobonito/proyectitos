# app.py
from flask import Flask, request, jsonify, render_template
import wikipediaapi
from datetime import datetime, timedelta

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get-events', methods=['POST'])
def get_events():
    data = request.json
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d')
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')

    wiki_wiki = wikipediaapi.Wikipedia('MyProjectName (example@example.com)', 'en')

    events = []
    current_date = start_date
    while current_date <= end_date:
        month = current_date.month
        day = current_date.day
        page = wiki_wiki.page(f"{month}_{day}")

        if page.exists():
            for event in page.sections_by_title('Events'):
                events.append({
                    'year': event.title,
                    'text': event.text
                })

        current_date += timedelta(days=1)

    return jsonify(events)

if __name__ == '__main__':
    app.run(debug=True)