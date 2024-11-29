import BLOG from 'blog.config';

/**
 * 第三方代码 统计脚本
 * @returns {JSX.Element}
 * @constructor
 */
const CommonScript = () => {
  return (
    <>
      {BLOG.CHATBASE_ID && (
        <>
          <script
            id={BLOG.CHATBASE_ID}
            src="https://www.chatbase.co/embed.min.js"
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
             window.chatbaseConfig = {
                chatbotId: "${BLOG.CHATBASE_ID}",
            }
        `,
            }}
          />
        </>
      )}

      {BLOG.COMMENT_DAO_VOICE_ID && (
        <>
          {/* DaoVoice 反馈 */}
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                  (function(i,s,o,g,r,a,m){i["DaoVoiceObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;a.charset="utf-8";m.parentNode.insertBefore(a,m)})(window,document,"script",('https:' == document.location.protocol ? 'https:' : 'http:') + "//widget.daovoice.io/widget/daf1a94b.js","daovoice")
                  `,
            }}
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                 daovoice('init', {
                    app_id: "${BLOG.COMMENT_DAO_VOICE_ID}"
                  });
                  daovoice('update');
                  `,
            }}
          />
        </>
      )}

      {BLOG.AD_WWADS_ID && (
        <script
          type="text/javascript"
          charSet="UTF-8"
          src="https://cdn.wwads.cn/js/makemoney.js"
          async
        ></script>
      )}

      {BLOG.COMMENT_TWIKOO_ENV_ID && (
        <script defer src={BLOG.COMMENT_TWIKOO_CDN_URL} />
      )}

      {BLOG.COMMENT_TIDIO_ID && (
        <script async src={`//code.tidio.co/${BLOG.COMMENT_TIDIO_ID}.js`} />
      )}

      {/* gitter聊天室 */}
      {BLOG.COMMENT_GITTER_ROOM && (
        <>
          <script
            src="https://sidecar.gitter.im/dist/sidecar.v1.js"
            async
            defer
          />
          <script
            async
            dangerouslySetInnerHTML={{
              __html: `
                ((window.gitter = {}).chat = {}).options = {
                  room: '${BLOG.COMMENT_GITTER_ROOM}'
                };
                `,
            }}
          />
        </>
      )}

      {/* 百度统计 */}
      {BLOG.ANALYTICS_BAIDU_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              var _hmt = _hmt || [];
              (function() {
                var hm = document.createElement("script");
                hm.src = "https://hm.baidu.com/hm.js?${BLOG.ANALYTICS_BAIDU_ID}";
                var s = document.getElementsByTagName("script")[0]; 
                s.parentNode.insertBefore(hm, s);
              })();
              `,
          }}
        />
      )}

      {/* 站长统计 */}
      {BLOG.ANALYTICS_CNZZ_ID && (
        <script
          async
          dangerouslySetInnerHTML={{
            __html: `
              document.write(unescape("%3Cspan style='display:none' id='cnzz_stat_icon_${BLOG.ANALYTICS_CNZZ_ID}'%3E%3C/span%3E%3Cscript src='https://s9.cnzz.com/z_stat.php%3Fid%3D${BLOG.ANALYTICS_CNZZ_ID}' type='text/javascript'%3E%3C/script%3E"));
              `,
          }}
        />
      )}


      {/* 引入音乐播放 */}
      {JSON.parse(BLOG.MUSIC_PLAYER) && (
        <script async src={BLOG.MUSIC_PLAYER_CDN_URL} />
      )}
      {JSON.parse(BLOG.MUSIC_PLAYER) &&
        JSON.parse(BLOG.MUSIC_PLAYER_METING) && (
          <script
            async
            src="https://cdnjs.cloudflare.com/ajax/libs/meting/2.0.1/Meting.min.js"
          />
        )}
    </>
  );
};

export default CommonScript;
