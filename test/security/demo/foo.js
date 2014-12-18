
describe('/_demo', function() {

  describe('/foo', function() {

    it('is readable by everyone', function() {
      expect(null).can.read.path('_demo/foo');
    });

    it('is only writable by logged-in users', function() {
      expect({ uid: 'somebody' }).can.write.to.path('_demo/foo');
    });

  });

});
