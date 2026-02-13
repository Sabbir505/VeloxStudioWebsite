export const GEMINI_MODEL = 'gemini-3-flash-preview';

export const MAX_FILE_SIZE_MB = 10;
export const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];

export const DISCLAIMER_TEXT = "Not financial advice. DYOR.";

export const SAMPLE_PROMPT = `
  Act as a top-tier crypto day trader. Analyze this chart for a high-impact social media update.

  Identify:
  1. Asset Name (Strictly TICKER/USDT format. Default to USDT pair).
  2. Timeframe.
  3. Market Structure (e.g., MSB, Uptrend, Downtrend, Range).
  4. Price Action Patterns (e.g., SFP, Flags, Wedges, liquidity sweeps).
  5. Key Liquidity Levels (Support/Resistance).
  6. The Verdict (assessment): Write a single, cohesive technical narrative paragraph (approx 50-75 words) using this specific flow:
     - Start with the Ticker and the primary structure (e.g., "#BTC is respecting the ascending channel on the 4H timeframe...").
     - Describe the recent reaction (e.g., "The recent pullback found demand near...").
     - State the thesis/condition (e.g., "As long as price holds above X, a move toward Y is likely.").
     - State the invalidation (e.g., "A clean break below Z would invalidate the setup.").
     - Use specific price levels from the image.
     - DO NOT use bullet points or labels like "Verdict:".
  7. Confidence score (0-100).

  Tone & Style:
  - Professional, concise, "Smart Money" trader.
  - No hedging or "AI" sounding filler.
`;

export const MARKET_OVERVIEW_PROMPT = `
  Analyze this image of a crypto market heatmap or price list (e.g. Coin360, TradingView list).
  
  Generate:
  1. Overall Sentiment (Bullish, Bearish, or Mixed).
  2. Market Mood: A short, punchy 2-4 word phrase describing the state (e.g., "Bitcoin Dominance Squeeze", "Altcoin Bloodbath", "Green Across Board").
  3. Top Performers: Identify up to 5 tickers with the highest positive % visible. Format: Ticker (+X%).
  4. Laggards: Identify up to 5 tickers with negative % or lowest gains. Format: Ticker (-X%).
  5. Summary: A professional 2-3 sentence observation of money flow. (e.g., "Liquidity is rotating from BTC to L1s.", "Total market sell-off driven by macro fears.").
  6. Social Post: A list-style update. 
     - Structure: 
       "🌍 Market Update"
       [Market Mood]
       
       🚀 Strength: $AAA, $BBB
       🔻 Weakness: $CCC, $DDD
       
       📝 [Summary]
       
       #Crypto #Bitcoin #Markets
`;

export const NEWS_PROMPT = `
  Act as a macro-focused crypto trader. Analyze the provided topic/news (e.g., FOMC, CPI, GDP, Tech Upgrade) for a social media update.

  Generate:
  1. Impact Level (High/Medium/Low).
  2. Market Sentiment (Hawkish, Dovish, Neutral, or Volatile).
  3. Affected Assets: List up to 3 tickers most likely to move (e.g., $BTC, $DXY, $GOLD, $ETH).
  4. Trading Strategy: A short, 3-5 word directive (e.g., "Long Volatility", "Wait for flush", "Short bounces").
  5. Key Takeaway: A 1-sentence "bottom line" for traders.
  6. Social Post: A punchy, "Smart Money" style post (max 280 chars style). 
     - Focus on liquidity, volatility, and reaction. 
     - Be cynical/professional. No "Exciting news!" fluff.
     - Example tone: "CPI prints hot. Fed pivot expectations dead. DXY ripping. Protect capital."
`;

export const MARKET_PULSE_PROMPT = `
  Perform a Google Search to identify the top 5 most critical cryptocurrency market news stories from the last 12-24 hours relative to the provided "Current Date".
  
  CRITICAL INSTRUCTION:
  - IGNORE old news. If a story is older than 24 hours, do not include it.
  - Prioritize breaking news happening *today*.

  Focus on high-impact items such as:
  - Regulatory rulings (SEC, etc.)
  - Macroeconomic data (CPI, Fed Rates, GDP)
  - Major protocol upgrades or hacks
  - Institutional flows (ETF data)

  Output a JSON object containing:
  1. marketOverview: A 2-sentence summary of the overall market mood based on the latest search results.
  2. news: A list of 5 items (title, summary, sentiment, timestamp). Timestamp must be relative to now (e.g., "2h ago").
  3. upcomingEvents: A list of 3 items (event, date, importance, expectedImpact) for the next 7 days.

  Be concise, professional, and data-driven.
`;

export const BINANCE_SQUARE_PROMPT = `
  Act as a top Binance Square Content Creator (KOL).
  
  I will provide you with a News Item or an Upcoming Event.
  Write a high-engagement Binance Square post (approx 300-500 characters) about it.

  Guidelines:
  - **Headline**: Start with a catchy, all-caps headline/hook with emojis.
  - **Body**: Summarize the news and why it matters for the market.
  - **Opinion**: Add a "Smart Money" take (Bullish/Bearish/Caution).
  - **Engagement**: Ask a question to drive comments.
  - **Tags**: Use #Binance #Crypto #Bitcoin + 2 relevant tags.
  - **Formatting**: Use line breaks for readability. Do not use markdown bolding (**text**) as it may not render, use ALL CAPS for emphasis instead.
  
  Input Data:
`;

export const SIGNAL_PROMPT = `
  Analyze this trading chart which appears to have a strategy dashboard or metric table overlay.
  
  Extract the following data strictly from the image:
  1. Ticker. Ensure the format is TICKER/USDT (e.g. XRP/USDT).
  2. Timeframe (e.g. 30m).
  3. Direction: "Long" or "Short" (Look for "Current Position" or indicator labels).
  4. Entry Price.
  5. Stop Loss Price.
  6. Strategy Metrics:
     - Win Rate (e.g. 69.92%)
     - Net PnL (e.g. 679.36%).
     - Win/Loss Ratio (e.g. 0.53).
     - Confidence Score (e.g. 90%, 9.5, or High). Look for "Entry Conf", "Entry Score", or "Conf". STRICTLY IGNORE "Live Conf".
  
  **Calculations & Logic:**
  - If targets are not visible, calculate 4 targets (1R, 2R, 3R, 4R).
  - **CRITICAL**: Calculate the ROI % for each Target price relative to the Entry price. Format as (+X.X%).
  - **Sanitization**: If "Net PnL" is negative (starts with -), DO NOT include it in the "formattedPost" string. Only include positive stats in the text.

  Finally, generate a "formattedPost" string using this high-engagement template:

  ⚡ $TICKER/USDT | [Direction] Setup
  
  ENTRY: [Entry Price]
  STOP: [Stop Loss Price]

  📊 System Metrics:
  • Confidence: [Confidence Score] 🔥
  • Win Rate: [Win Rate]
  [Include Net PnL line ONLY if positive]

  🎯 Targets:
  1️⃣ [Target 1 Price] ([ROI %])
  2️⃣ [Target 2 Price] ([ROI %])
  3️⃣ [Target 3 Price] ([ROI %])
  4️⃣ [Target 4 Price] ([ROI %])

  🛡️ Plan: Move SL to Breakeven after TP1.

  #Crypto #Trading #[Ticker]
`;

export const PRAISE_PROMPT = `
  Analyze the provided images to generate a "Signal Success" social media post.
  
  **Step 1: Visual Data Extraction (Precision Required)**
  1. **Identify Tickers**: List every unique ticker (e.g., BTC, ETH, SOL).
  
  2. **Verify TP Level (Logic)**:
     - **Visual Check**: Look for horizontal lines labeled TP1, TP2, TP3, TP4.
     - **Price Action**: Compare the HIGHEST candle wick in the provided image against these lines.
       - If price crossed TP3 line -> Report "TP 3 Hit".
       - If price crossed TP1 line but not TP2 -> Report "TP 1 Hit".
     - **Text Overlays**: Trust visual text like "Target 2 Hit", "T2 ✅", "TP3 Smashed", or labels like "TP4 (4ATR)" near the price.

  3. **Extract Profit % (Logic)**:
     - **CRITICAL PRIORITY**: You must find the specific label/badge on the chart that says "**Long Printed**", "**Short Printed**", "**Long Printing**", or "**Short Printing**".
     - **Extraction Rule**: These labels usually contain a percentage (e.g., "+338.29%"). Extract this number EXACTLY.
     - **Conflict Resolution**: If multiple such labels appear on the same chart (e.g. one from last week and one from today), **ONLY select the one associated with the CURRENT price action** (usually the right-most one, or the one labeled "Printing"). **DO NOT SUM** them.
     - **Fallback**: Only if these specific labels are completely absent, look for other ROI/PnL indicators.

  4. **Output Metrics**:
     - Extract 'numberOfTargetsHit' as an integer (0-4).
     - Extract 'totalProfitPercentage' as a string (e.g. "+338.29%").

  **Step 2: Social Post Generation (High Variety Mode)**
  *Instruction*: You must vary your writing style. Do not use the same template repeatedly. Pick one of the following "Vibes" randomly for this response to ensure uniqueness:
  - Vibe A: "The Sniper" (Short, punchy, professional, minimal emojis).
  - Vibe B: "The Hype" (Excited, uses fire/rocket emojis, focuses on the big wins).
  - Vibe C: "The Analyst" (Focuses on the setup validation, market structure).

  **Draft the Post (Structure):**
  
  [Paragraph 1: The Hook]
  - Write a unique opening sentence based on the selected Vibe. Mention the Ticker.
  - *Forbidden*: Do not start with generic phrases like "The market is moving" or "Here is the update". Be creative.

  [Paragraph 2: The Scoreboard (Mandatory Data)]
  - Format: "$TICKER: [TP #] Smashed 🎯 (+[Total Profit]% Profit)"
  - Example: "$SOL: TP 4 Obliterated 💰 (+400% ROI)"
  - **MANDATORY**: If the profit label says "Printing", mention "Trade is RUNNING" or similar. If "Printed", mention "Banked".
  - Include "SL moved to Entry" or "Risk Free" if applicable.

  [Paragraph 3: The Flex]
  - A short comment on the trade execution based on the Vibe.
  - *Constraint*: Do NOT mention specific algorithm names. Keep it generic (e.g. "Clean reaction," "No drawdown," "System delivered").

  [Paragraph 4: Call to Action]
  - "Join the winning side" or "Don't miss the next setup" (Vary this wording every time).

  [Hashtags]
  #Crypto #Trading #Signals #[Ticker]
`;