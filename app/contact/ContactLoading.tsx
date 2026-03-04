export const CatLoader = ({ fadeOut }: { fadeOut: boolean }) => {
    
  return (
    <div id="loading-screen" className={fadeOut ? "fade-out" : ""}>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap");

        /* =========================================
           ★ローディング画面（明るめブルーVer）
           ========================================= */
        #loading-screen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;

          /* ★修正: 暗すぎない、爽やかな青〜紫のグラデーション */
          background: linear-gradient(
            to bottom,
            #4338ca 0%,
            /* インディゴ */ #6366f1 40%,
            /* 明るい紫青 */ #60a5fa 70%,
            /* 明るい青 */ #a5f3fc 100% /* 爽やかな水色 */
          );
          z-index: 50;

          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          transition:
            opacity 1.5s ease,
            visibility 1.5s ease;
          opacity: 1;
          visibility: visible;
          pointer-events: all;
        }

        #loading-screen.fade-out {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .keyboard-loader {
          display: flex;
          gap: 12px;
          padding-top: 25px;
          transform: perspective(500px) rotateX(15deg);
        }

        @media (max-width: 768px) {
          .keyboard-loader {
            gap: 8px;
            transform: perspective(500px) rotateX(10deg) scale(0.85);
          }
        }

        /* --- ネコミミキーキャップ --- */
        .key.cat {
          position: relative;
          width: 60px;
          height: 60px;

          /* ★修正: 背景が明るくなったので、キーは「白」を基調に見やすく */
          background: 
              /* 左耳 */
            linear-gradient(135deg, transparent 50%, #ffffff 50%)
              no-repeat -10px -15px / 40px 40px,
            /* 右耳 */ linear-gradient(225deg, transparent 50%, #ffffff 50%)
              no-repeat 30px -15px / 40px 40px,
            /* 本体 */ linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);

          border-radius: 16px;
          font-family: "Fredoka One", cursive, sans-serif;
          font-size: 32px;
          color: #4f46e5; /* 文字色はクッキリしたインディゴ */
          text-shadow: 1px 1px 0 rgba(199, 210, 254, 0.5);

          display: flex;
          justify-content: center;
          align-items: center;

          /* 影を少し強めにして浮遊感を出す */
          box-shadow:
            0 10px 0 #818cf8,
            0 15px 20px rgba(0, 0, 0, 0.2);

          animation: catBounce 1.2s infinite ease-in-out;
          overflow: hidden;
        }

        .key.cat::before {
          content: "";
          position: absolute;
          top: 5px;
          left: 5px;
          width: 85%;
          height: 40%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.9),
            rgba(255, 255, 255, 0.1)
          );
          border-radius: 12px 12px 20px 20px;
          z-index: 1;
          pointer-events: none;
        }

        .key.cat:nth-child(1) {
          animation-delay: 0s;
        }
        .key.cat:nth-child(2) {
          animation-delay: 0.1s;
        }
        .key.cat:nth-child(3) {
          animation-delay: 0.2s;
        }
        .key.cat:nth-child(4) {
          animation-delay: 0.3s;
        }
        .key.cat:nth-child(5) {
          animation-delay: 0.4s;
        }
        .key.cat:nth-child(6) {
          animation-delay: 0.5s;
        }
        .key.cat:nth-child(7) {
          animation-delay: 0.6s;
        }

        @keyframes catBounce {
          0%,
          100% {
            transform: translateY(0) scale(1, 1);
            box-shadow:
              0 10px 0 #818cf8,
              0 15px 20px rgba(0, 0, 0, 0.2);
          }
          30% {
            transform: translateY(-25px) scale(1.1, 0.9) rotateX(-10deg);
            box-shadow:
              0 35px 0 #818cf8,
              0 40px 25px rgba(0, 0, 0, 0.15);
          }
          50% {
            transform: translateY(8px) scale(0.85, 1.15);
            box-shadow:
              0 0 0 #818cf8,
              0 0 0 rgba(0, 0, 0, 0);
            background:
              linear-gradient(135deg, transparent 50%, #818cf8 50%)
                no-repeat -10px -5px / 40px 40px,
              linear-gradient(225deg, transparent 50%, #818cf8 50%) no-repeat
                30px -5px / 40px 40px,
              linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          }
          70% {
            transform: translateY(-5px) scale(1.05, 0.95);
            box-shadow:
              0 12px 0 #818cf8,
              0 15px 15px rgba(0, 0, 0, 0.2);
            background:
              linear-gradient(135deg, transparent 50%, #ffffff 50%)
                no-repeat -10px -15px / 40px 40px,
              linear-gradient(225deg, transparent 50%, #ffffff 50%) no-repeat
                30px -15px / 40px 40px,
              linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
          }
        }

        .loading-text {
          margin-top: 60px;
          font-family: "Fredoka One", cursive, sans-serif;
          color: #fff;
          font-size: 32px;
          letter-spacing: 0.1em;
          text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          transform: perspective(500px) rotateX(15deg);
        }

        .paw {
          display: inline-block;
          font-size: 1.2em;
          filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));
          animation: pawFloatBig 2s infinite ease-in-out;
        }

        @keyframes pawFloatBig {
          0%,
          100% {
            transform: rotate(0deg) translateY(0) scale(1);
          }
          50% {
            transform: rotate(20deg) translateY(-15px) scale(1.1);
          }
        }
      `}</style>

      <div className="keyboard-loader">
        <div className="key cat">L</div>
        <div className="key cat">O</div>
        <div className="key cat">A</div>
        <div className="key cat">D</div>
        <div className="key cat">I</div>
        <div className="key cat">N</div>
        <div className="key cat">G</div>
      </div>
      <div className="loading-text">
        NOW LOADING <span className="paw">🐾</span>
      </div>
    </div>
  );
};